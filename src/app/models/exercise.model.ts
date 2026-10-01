export const LEVELS = ['base', 'intermedio', 'avanzato'] as const;

export type Level = (typeof LEVELS)[number];

export const LEVEL_LABEL: Record<Level, string> = {
  base: 'Base',
  intermedio: 'Intermedio',
  avanzato: 'Avanzato',
};

export type Equipment = 'nessuno' | 'sbarra' | 'parallele' | 'sedia' | 'tavolo' | 'zaino';

export const MUSCLES = [
  'petto',
  'spalle',
  'tricipiti',
  'dorso',
  'bicipiti',
  'quadricipiti',
  'femorali',
  'glutei',
  'polpacci',
  'adduttori',
  'lombari',
  'core',
] as const;

export type MuscleGroup = (typeof MUSCLES)[number];

export interface Variant {
  id: string;
  name: string;
  frames: string[];
  note?: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscles: MuscleGroup[];
  equipment: Equipment[];
  cues: string[];
  variants: Record<Level, Variant>;
}
