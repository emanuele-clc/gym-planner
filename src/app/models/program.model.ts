import { Level } from './exercise.model';

export const WEEKDAYS = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom'] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export const WEEKDAY_LABEL: Record<Weekday, string> = {
  lun: 'Lunedì',
  mar: 'Martedì',
  mer: 'Mercoledì',
  gio: 'Giovedì',
  ven: 'Venerdì',
  sab: 'Sabato',
  dom: 'Domenica',
};

export type Target =
  | { kind: 'reps'; min: number; max: number }
  | { kind: 'seconds'; min: number; max: number };

export interface Prescription {
  sets: number;
  target: Target;
  restSeconds: number;
}

export interface Alternative {
  exerciseId: string;
  prescription: Record<Level, Prescription>;
}

export interface SessionItem {
  exerciseId: string;
  prescription: Record<Level, Prescription>;
  alternative?: Alternative;
  bandAlternative?: Alternative;
}

export interface Session {
  id: string;
  day: Weekday;
  title: string;
  items: SessionItem[];
  bandItems?: SessionItem[];
}

export interface Program {
  warmup: string[];
  sessions: Session[];
}

export interface ExerciseLog {
  sessionId: string;
  exerciseId: string;
  date: string;
  level: Level;
  setsCompleted: number[];
}
