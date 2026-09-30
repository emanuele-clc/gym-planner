import { Injectable, effect, signal } from '@angular/core';
import { EXERCISES } from '../data/exercises.data';
import { PROGRAM } from '../data/program.data';
import { Equipment, Exercise, LEVELS, Level, MUSCLES, MuscleGroup, Variant } from '../models/exercise.model';
import { ExerciseLog, Prescription, Program, Session, WEEKDAYS, Weekday } from '../models/program.model';

export interface ResolvedItem {
  exercise: Exercise;
  variant: Variant;
  prescription: Prescription;
}

export interface SessionStats {
  exercises: number;
  sets: number;
  minutes: number;
  equipment: Equipment[];
  muscles: MuscleGroup[];
}

export interface Progress {
  done: number;
  total: number;
}

export interface MuscleVolume {
  muscle: MuscleGroup;
  sets: number;
  days: number;
}

const EXECUTION_SECONDS = 40;
const WARMUP_MINUTES = 8;

const pad = (n: number): string => String(n).padStart(2, '0');

export const isoDay = (d: Date = new Date()): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const weekStartIso = (): string => {
  const d = new Date();
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return isoDay(d);
};

const LEVEL_KEY = 'cp.level';
const LOGS_KEY = 'cp.logs';

const isLevel = (value: unknown): value is Level =>
  typeof value === 'string' && (LEVELS as readonly string[]).includes(value);

const isExerciseLog = (value: unknown): value is ExerciseLog => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v['sessionId'] === 'string' &&
    typeof v['exerciseId'] === 'string' &&
    typeof v['date'] === 'string' &&
    isLevel(v['level']) &&
    Array.isArray(v['setsCompleted']) &&
    v['setsCompleted'].every((n) => typeof n === 'number')
  );
};

const readLevel = (): Level => {
  const raw = localStorage.getItem(LEVEL_KEY);
  return isLevel(raw) ? raw : 'intermedio';
};

const readLogs = (): ExerciseLog[] => {
  const raw = localStorage.getItem(LOGS_KEY);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isExerciseLog) : [];
  } catch {
    return [];
  }
};

@Injectable({ providedIn: 'root' })
export class ProgramService {
  private readonly exercisesById = new Map(EXERCISES.map((e) => [e.id, e]));

  readonly program: Program = PROGRAM;
  readonly level = signal<Level>(readLevel());
  readonly logs = signal<ExerciseLog[]>(readLogs());

  constructor() {
    effect(() => localStorage.setItem(LEVEL_KEY, this.level()));
    effect(() => localStorage.setItem(LOGS_KEY, JSON.stringify(this.logs())));
  }

  session(id: string): Session | undefined {
    return this.program.sessions.find((s) => s.id === id);
  }

  items(sessionId: string): ResolvedItem[] {
    const session = this.session(sessionId);
    if (!session) return [];
    const level = this.level();
    return session.items.flatMap((item) => {
      const exercise = this.exercisesById.get(item.exerciseId);
      if (!exercise) return [];
      return [
        { exercise, variant: exercise.variants[level], prescription: item.prescription[level] },
      ];
    });
  }

  setLevel(level: Level): void {
    this.level.set(level);
  }

  saveLog(log: ExerciseLog): void {
    this.logs.update((prev) => [
      ...prev.filter(
        (l) =>
          !(
            l.sessionId === log.sessionId &&
            l.exerciseId === log.exerciseId &&
            l.level === log.level &&
            l.date === log.date
          ),
      ),
      log,
    ]);
  }

  lastLog(sessionId: string, exerciseId: string, level: Level): ExerciseLog | undefined {
    return this.logs()
      .filter((l) => l.sessionId === sessionId && l.exerciseId === exerciseId && l.level === level)
      .at(-1);
  }

  exercise(id: string): Exercise | undefined {
    return this.exercisesById.get(id);
  }

  today(): string {
    return isoDay();
  }

  todayWeekday(): Weekday {
    return WEEKDAYS[(new Date().getDay() + 6) % 7];
  }

  stats(sessionId: string): SessionStats | null {
    const session = this.session(sessionId);
    if (!session) return null;
    const level = this.level();
    const equipment = new Set<Equipment>();
    const muscles = new Set<MuscleGroup>();
    let sets = 0;
    let seconds = 0;
    for (const item of session.items) {
      const exercise = this.exercisesById.get(item.exerciseId);
      if (!exercise) continue;
      const p = item.prescription[level];
      sets += p.sets;
      seconds += p.sets * (EXECUTION_SECONDS + p.restSeconds);
      exercise.equipment.filter((e) => e !== 'nessuno').forEach((e) => equipment.add(e));
      muscles.add(exercise.muscles[0]);
    }
    const minutes = Math.round((seconds / 60 + WARMUP_MINUTES) / 5) * 5;
    return {
      exercises: session.items.length,
      sets,
      minutes,
      equipment: [...equipment],
      muscles: [...muscles],
    };
  }

  progress(sessionId: string): Progress {
    const session = this.session(sessionId);
    if (!session) return { done: 0, total: 0 };
    const start = weekStartIso();
    const done = new Set(
      this.logs()
        .filter((l) => l.sessionId === sessionId && l.date >= start)
        .map((l) => l.exerciseId),
    ).size;
    return { done, total: new Set(session.items.map((i) => i.exerciseId)).size };
  }

  isLoggedToday(sessionId: string, exerciseId: string): boolean {
    const today = isoDay();
    return this.logs().some(
      (l) => l.sessionId === sessionId && l.exerciseId === exerciseId && l.date === today,
    );
  }

  loggedSets(): number {
    return this.logs().reduce((sum, l) => sum + l.setsCompleted.length, 0);
  }

  clearLogs(): void {
    this.logs.set([]);
  }

  weeklyVolume(): MuscleVolume[] {
    const level = this.level();
    const acc = new Map<MuscleGroup, { sets: number; days: Set<string> }>(
      MUSCLES.map((m) => [m, { sets: 0, days: new Set<string>() }]),
    );
    for (const session of this.program.sessions) {
      for (const item of session.items) {
        const exercise = this.exercisesById.get(item.exerciseId);
        const entry = exercise ? acc.get(exercise.muscles[0]) : undefined;
        if (!entry) continue;
        entry.sets += item.prescription[level].sets;
        entry.days.add(session.id);
      }
    }
    return [...acc.entries()]
      .map(([muscle, v]) => ({ muscle, sets: v.sets, days: v.days.size }))
      .sort((a, b) => b.sets - a.sets);
  }
}
