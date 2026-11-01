import { Level } from '../models/exercise.model';
import { Alternative, Prescription, Program, SessionItem } from '../models/program.model';

const reps = (sets: number, min: number, max: number, restSeconds: number): Prescription => ({
  sets,
  target: { kind: 'reps', min, max },
  restSeconds,
});

const rx = (
  base: Prescription,
  intermedio: Prescription,
  avanzato: Prescription,
): Record<Level, Prescription> => ({ base, intermedio, avanzato });

/** Multiarticolari pesanti: bilanciere, Smith, manubri pesanti. */
const heavy = (): Record<Level, Prescription> =>
  rx(reps(3, 10, 12, 120), reps(4, 6, 10, 150), reps(4, 5, 8, 180));

/** Multiarticolari secondari. */
const medium = (): Record<Level, Prescription> =>
  rx(reps(3, 10, 12, 90), reps(3, 8, 12, 120), reps(4, 8, 10, 120));

/** Isolamento: macchine, cavo, manubri leggeri. */
const light = (sets = 3): Record<Level, Prescription> =>
  rx(reps(3, 12, 15, 60), reps(sets, 10, 15, 75), reps(sets + 1, 10, 15, 75));

const core = (): Record<Level, Prescription> =>
  rx(reps(3, 10, 12, 45), reps(3, 12, 15, 60), reps(3, 12, 15, 60));

const calves = (): Record<Level, Prescription> =>
  rx(reps(3, 12, 15, 45), reps(4, 10, 15, 60), reps(4, 10, 15, 60));

/** In palestra la sbarra c’è (rack), ma se è occupata si passa al cavo. */
const ALTERNATIVES: Record<string, Alternative | undefined> = {
  pullup: {
    exerciseId: 'cable-lat-pulldown',
    prescription: rx(reps(3, 10, 12, 90), reps(4, 8, 12, 90), reps(4, 8, 12, 90)),
  },
  'leg-raise': {
    exerciseId: 'cable-crunch',
    prescription: core(),
  },
};

const item = (exerciseId: string, prescription: Record<Level, Prescription>): SessionItem => ({
  exerciseId,
  prescription,
  alternative: ALTERNATIVES[exerciseId],
});

export const GYM_PROGRAM: Program = {
  warmup: [
    '5 min di cyclette, ellittica o tapis roulant a ritmo facile',
    'Cerchi di braccia, rotazioni toraciche e 10 squat a corpo libero',
    'Face pull o reverse fly leggeri, 1x15 (nelle sedute di parte alta)',
    '2 serie di avvicinamento sul primo esercizio: 50% x 10, 75% x 5',
  ],
  sessions: [
    {
      id: 'pal-lun-push',
      day: 'lun',
      title: 'Push',
      items: [
        item('bench-press', heavy()),
        item('incline-press', medium()),
        item('shoulder-press', medium()),
        item('pec-fly', light()),
        item('lateral-raise', light(4)),
        item('triceps-cable', light()),
        item('cable-crunch', core()),
      ],
    },
    {
      id: 'pal-mar-pull',
      day: 'mar',
      title: 'Pull',
      items: [
        item('pullup', rx(reps(4, 3, 5, 120), reps(4, 5, 8, 150), reps(4, 6, 10, 150))),
        item('barbell-row', heavy()),
        item('db-row', medium()),
        item('reverse-fly-machine', light()),
        item('face-pull', light()),
        item('db-curl', light()),
        item('hammer-curl', rx(reps(2, 10, 12, 60), reps(3, 10, 12, 60), reps(3, 10, 12, 60))),
        item('leg-raise', rx(reps(3, 8, 12, 60), reps(3, 8, 12, 60), reps(3, 8, 12, 60))),
      ],
    },
    {
      id: 'pal-mer-gambe',
      day: 'mer',
      title: 'Gambe · quadricipiti',
      items: [
        item('back-squat', heavy()),
        item('rdl', medium()),
        item('split-squat', medium()),
        item('leg-extension', light()),
        item('leg-curl', light()),
        item('gym-calf', calves()),
        item('pallof', core()),
      ],
    },
    {
      id: 'pal-ven-upper',
      day: 'ven',
      title: 'Upper',
      items: [
        item('db-bench', medium()),
        item('pullup', rx(reps(3, 3, 5, 120), reps(3, 6, 10, 120), reps(4, 6, 10, 150))),
        item('cable-row', medium()),
        item('chest-press', light()),
        item('lateral-raise', light()),
        item('triceps-cable', light()),
        item('db-curl', light()),
        item('cable-crunch', core()),
      ],
    },
    {
      id: 'pal-sab-gambe',
      day: 'sab',
      title: 'Gambe · glutei e femorali',
      items: [
        item('deadlift', rx(reps(3, 8, 10, 150), reps(3, 5, 8, 180), reps(4, 4, 6, 180))),
        item('hip-thrust', medium()),
        item('db-lunge', medium()),
        item('leg-curl', light()),
        item('leg-extension', light()),
        item('pull-through', light()),
        item('gym-calf', calves()),
        item('leg-raise', rx(reps(3, 8, 12, 60), reps(3, 8, 12, 60), reps(3, 8, 12, 60))),
      ],
    },
  ],
};
