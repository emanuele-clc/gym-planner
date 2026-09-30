import { Level } from '../models/exercise.model';
import { Prescription, Program } from '../models/program.model';

const reps = (sets: number, min: number, max: number, restSeconds: number): Prescription => ({
  sets,
  target: { kind: 'reps', min, max },
  restSeconds,
});

const secs = (sets: number, min: number, max: number, restSeconds: number): Prescription => ({
  sets,
  target: { kind: 'seconds', min, max },
  restSeconds,
});

const rx = (
  base: Prescription,
  intermedio: Prescription,
  avanzato: Prescription,
): Record<Level, Prescription> => ({ base, intermedio, avanzato });

export const PROGRAM: Program = {
  warmup: [
    'Cerchi di braccia e spalle, 30"',
    'Cat-cow e rotazioni toraciche, 10 rip',
    'Scapular pull-up alla sbarra o scapular push-up a terra, 2x10',
    '1 serie leggera del primo esercizio, a metà sforzo',
  ],
  sessions: [
    {
      id: 'lun-push',
      day: 'lun',
      title: 'Push',
      items: [
        { exerciseId: 'dip', prescription: rx(reps(3, 3, 6, 120), reps(4, 6, 10, 120), reps(4, 8, 12, 120)) },
        { exerciseId: 'pike-pushup', prescription: rx(reps(3, 5, 8, 120), reps(4, 6, 10, 120), reps(4, 3, 6, 120)) },
        { exerciseId: 'pushup-declinato', prescription: rx(reps(3, 8, 12, 90), reps(3, 10, 15, 90), reps(3, 6, 10, 90)) },
        { exerciseId: 'diamond', prescription: rx(reps(3, 6, 10, 90), reps(3, 8, 12, 90), reps(3, 8, 12, 90)) },
        { exerciseId: 'plank', prescription: rx(secs(3, 20, 30, 60), secs(3, 30, 45, 60), reps(3, 6, 10, 60)) },
      ],
    },
    {
      id: 'mar-pull',
      day: 'mar',
      title: 'Pull',
      items: [
        { exerciseId: 'pullup', prescription: rx(reps(4, 3, 5, 120), reps(4, 5, 10, 120), reps(4, 8, 12, 120)) },
        { exerciseId: 'chinup', prescription: rx(reps(3, 3, 5, 120), reps(3, 6, 10, 120), reps(3, 8, 12, 120)) },
        { exerciseId: 'australian-row', prescription: rx(reps(3, 8, 12, 90), reps(3, 10, 15, 90), reps(3, 10, 15, 90)) },
        { exerciseId: 'scapular-pullup', prescription: rx(reps(3, 8, 10, 60), reps(3, 10, 12, 60), reps(3, 12, 15, 60)) },
        { exerciseId: 'dead-hang', prescription: rx(secs(3, 15, 25, 60), secs(3, 30, 45, 60), secs(3, 30, 45, 60)) },
      ],
    },
    {
      id: 'mer-gambe',
      day: 'mer',
      title: 'Gambe + core',
      items: [
        { exerciseId: 'bulgarian', prescription: rx(reps(3, 8, 10, 90), reps(4, 8, 12, 90), reps(4, 10, 12, 90)) },
        { exerciseId: 'squat', prescription: rx(reps(3, 15, 20, 90), reps(3, 15, 20, 90), reps(3, 12, 15, 90)) },
        { exerciseId: 'glute-bridge', prescription: rx(reps(3, 12, 15, 60), reps(3, 12, 12, 60), reps(3, 10, 12, 60)) },
        { exerciseId: 'calf-raise', prescription: rx(reps(3, 15, 20, 45), reps(4, 15, 20, 45), reps(4, 12, 15, 45)) },
        { exerciseId: 'leg-raise', prescription: rx(reps(3, 8, 12, 60), reps(3, 8, 12, 60), reps(3, 8, 12, 60)) },
        { exerciseId: 'plank', prescription: rx(secs(3, 30, 45, 60), secs(3, 45, 60, 60), reps(3, 6, 10, 60)) },
      ],
    },
    {
      id: 'ven-upper',
      day: 'ven',
      title: 'Upper',
      items: [
        { exerciseId: 'pullup', prescription: rx(reps(4, 3, 5, 120), reps(4, 5, 8, 120), reps(4, 8, 12, 120)) },
        { exerciseId: 'dip', prescription: rx(reps(4, 3, 6, 120), reps(4, 6, 10, 120), reps(4, 8, 12, 120)) },
        { exerciseId: 'pushup', prescription: rx(reps(3, 10, 15, 90), reps(3, 8, 12, 90), reps(3, 4, 8, 90)) },
        { exerciseId: 'australian-row', prescription: rx(reps(3, 8, 12, 90), reps(3, 8, 12, 90), reps(3, 8, 12, 90)) },
        { exerciseId: 'l-sit', prescription: rx(secs(4, 10, 20, 60), secs(4, 10, 20, 60), secs(4, 10, 20, 60)) },
        { exerciseId: 'hollow', prescription: rx(secs(3, 20, 30, 45), secs(3, 30, 30, 45), secs(3, 30, 40, 45)) },
      ],
    },
    {
      id: 'sab-gambe',
      day: 'sab',
      title: 'Gambe + core',
      items: [
        { exerciseId: 'jump-squat', prescription: rx(reps(3, 8, 8, 90), reps(4, 8, 8, 90), reps(4, 8, 8, 90)) },
        { exerciseId: 'lunge', prescription: rx(reps(3, 10, 12, 90), reps(3, 12, 12, 90), reps(3, 12, 15, 90)) },
        { exerciseId: 'pistol', prescription: rx(reps(3, 8, 12, 90), reps(3, 5, 8, 90), reps(3, 3, 6, 90)) },
        { exerciseId: 'nordic', prescription: rx(reps(3, 8, 10, 90), reps(3, 5, 8, 90), reps(3, 5, 8, 90)) },
        { exerciseId: 'leg-raise', prescription: rx(reps(3, 8, 12, 60), reps(3, 8, 12, 60), reps(3, 8, 12, 60)) },
        { exerciseId: 'side-plank', prescription: rx(secs(3, 20, 30, 45), secs(3, 30, 40, 45), secs(3, 40, 50, 45)) },
      ],
    },
  ],
};
