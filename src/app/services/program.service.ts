import { Injectable, effect, signal } from '@angular/core';
import { EXERCISES } from '../data/exercises.data';
import { PROGRAM } from '../data/program.data';
import { Equipment, Exercise, LEVELS, Level, MUSCLES, MuscleGroup, Variant } from '../models/exercise.model';
import {
  ExerciseLog,
  Prescription,
  Program,
  Session,
  SessionItem,
  WEEKDAYS,
  Weekday,
} from '../models/program.model';

export type BarMode = 'con' | 'senza';

export interface ResolvedItem {
  exercise: Exercise;
  variant: Variant;
  prescription: Prescription;
  level: Level;
  isAlternative: boolean;
  replaces?: string;
  originalId: string;
  swapLabel?: string;
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
const BAR_KEY = 'cp.bar';
const OVERRIDES_KEY = 'cp.overrides';
const SWAPS_KEY = 'cp.swaps';
const BANDS_KEY = 'cp.bands';

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

const readBarMode = (): BarMode => (localStorage.getItem(BAR_KEY) === 'senza' ? 'senza' : 'con');

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

const readOverrides = (): Record<string, Level> => {
  const raw = localStorage.getItem(OVERRIDES_KEY);
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return {};
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>).filter(
        (entry): entry is [string, Level] => isLevel(entry[1]),
      ),
    );
  } catch {
    return {};
  }
};

const readBands = (): boolean => localStorage.getItem(BANDS_KEY) === 'true';

const readSwaps = (): Record<string, boolean> => {
  const raw = localStorage.getItem(SWAPS_KEY);
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return {};
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>).filter(
        (entry): entry is [string, boolean] => typeof entry[1] === 'boolean',
      ),
    );
  } catch {
    return {};
  }
};

@Injectable({ providedIn: 'root' })
export class ProgramService {
  private readonly exercisesById = new Map(EXERCISES.map((e) => [e.id, e]));

  readonly program: Program = PROGRAM;
  readonly level = signal<Level>(readLevel());
  readonly barMode = signal<BarMode>(readBarMode());
  readonly overrides = signal<Record<string, Level>>(readOverrides());
  readonly swaps = signal<Record<string, boolean>>(readSwaps());
  readonly bands = signal<boolean>(readBands());
  readonly logs = signal<ExerciseLog[]>(readLogs());

  constructor() {
    effect(() => localStorage.setItem(LEVEL_KEY, this.level()));
    effect(() => localStorage.setItem(BAR_KEY, this.barMode()));
    effect(() => localStorage.setItem(OVERRIDES_KEY, JSON.stringify(this.overrides())));
    effect(() => localStorage.setItem(SWAPS_KEY, JSON.stringify(this.swaps())));
    effect(() => localStorage.setItem(BANDS_KEY, String(this.bands())));
    effect(() => localStorage.setItem(LOGS_KEY, JSON.stringify(this.logs())));
  }

  session(id: string): Session | undefined {
    return this.program.sessions.find((s) => s.id === id);
  }

  exercise(id: string): Exercise | undefined {
    return this.exercisesById.get(id);
  }

  items(sessionId: string): ResolvedItem[] {
    const session = this.session(sessionId);
    return session ? this.resolve(session) : [];
  }

  setLevel(level: Level): void {
    this.level.set(level);
  }

  setBarMode(mode: BarMode): void {
    this.barMode.set(mode);
    this.swaps.set({});
  }

  setBands(on: boolean): void {
    this.bands.set(on);
  }

  toggleAlternative(originalId: string, currentlyAlternative: boolean): void {
    this.swaps.update((prev) => ({ ...prev, [originalId]: !currentlyAlternative }));
  }

  overrideFor(exerciseId: string): Level | null {
    return this.overrides()[exerciseId] ?? null;
  }

  setOverride(exerciseId: string, level: Level | null): void {
    this.overrides.update((prev) => {
      const next = { ...prev };
      if (level === null) delete next[exerciseId];
      else next[exerciseId] = level;
      return next;
    });
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

  today(): string {
    return isoDay();
  }

  todayWeekday(): Weekday {
    return WEEKDAYS[(new Date().getDay() + 6) % 7];
  }

  stats(sessionId: string): SessionStats | null {
    const session = this.session(sessionId);
    if (!session) return null;
    const equipment = new Set<Equipment>();
    const muscles = new Set<MuscleGroup>();
    let sets = 0;
    let seconds = 0;
    const resolved = this.resolve(session);
    for (const r of resolved) {
      sets += r.prescription.sets;
      seconds += r.prescription.sets * (EXECUTION_SECONDS + r.prescription.restSeconds);
      r.exercise.equipment.filter((e) => e !== 'nessuno').forEach((e) => equipment.add(e));
      muscles.add(r.exercise.muscles[0]);
    }
    const minutes = Math.round((seconds / 60 + WARMUP_MINUTES) / 5) * 5;
    return {
      exercises: resolved.length,
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
    const ids = new Set(this.resolve(session).map((r) => r.exercise.id));
    const done = new Set(
      this.logs()
        .filter((l) => l.sessionId === sessionId && l.date >= start && ids.has(l.exerciseId))
        .map((l) => l.exerciseId),
    ).size;
    return { done, total: ids.size };
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
    const acc = new Map<MuscleGroup, { sets: number; days: Set<string> }>(
      MUSCLES.map((m) => [m, { sets: 0, days: new Set<string>() }]),
    );
    for (const session of this.program.sessions) {
      for (const r of this.resolve(session)) {
        const entry = acc.get(r.exercise.muscles[0]);
        if (!entry) continue;
        entry.sets += r.prescription.sets;
        entry.days.add(session.id);
      }
    }
    return [...acc.entries()]
      .map(([muscle, v]) => ({ muscle, sets: v.sets, days: v.days.size }))
      .sort((a, b) => b.sets - a.sets);
  }

  private resolve(session: Session): ResolvedItem[] {
    const base = session.items.flatMap((item) => this.resolveItem(item));
    if (!this.bands()) return base;
    const present = new Set(base.map((r) => r.exercise.id));
    const extras = (session.bandItems ?? []).flatMap((item) => this.resolveItem(item));
    return [...base, ...extras.filter((r) => !present.has(r.exercise.id))];
  }

  private resolveItem(item: SessionItem): ResolvedItem[] {
    const noBar = this.barMode() === 'senza';
    const swaps = this.swaps();
    const overrides = this.overrides();
    const globalLevel = this.level();
    const original = this.exercisesById.get(item.exerciseId);
    if (!original) return [];
    const candidate = this.bands() ? (item.bandAlternative ?? item.alternative) : item.alternative;
    const swappable = original.equipment.includes('sbarra') ? candidate : undefined;
    const alt = swappable && (swaps[original.id] ?? noBar) ? swappable : undefined;
    const exercise = alt ? this.exercisesById.get(alt.exerciseId) : original;
    if (!exercise) return [];
    const altExercise = swappable ? this.exercisesById.get(swappable.exerciseId) : undefined;
    const prescriptions = alt ? alt.prescription : item.prescription;
    const level = overrides[exercise.id] ?? globalLevel;
    return [
      {
        exercise,
        variant: exercise.variants[level],
        prescription: prescriptions[level],
        level,
        isAlternative: alt !== undefined,
        replaces: alt ? original.name : undefined,
        originalId: original.id,
        swapLabel: alt
          ? `Torna a ${original.name}`
          : altExercise
            ? `Senza sbarra: ${altExercise.name}`
            : undefined,
      },
    ];
  }
}
