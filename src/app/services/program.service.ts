import { Injectable, effect, signal } from '@angular/core';
import { EXERCISES } from '../data/exercises.data';
import { PROGRAM } from '../data/program.data';
import { Exercise, LEVELS, Level, Variant } from '../models/exercise.model';
import { ExerciseLog, Prescription, Program, Session } from '../models/program.model';

export interface ResolvedItem {
  exercise: Exercise;
  variant: Variant;
  prescription: Prescription;
}

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
}
