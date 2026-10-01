import { Level } from '../models/exercise.model';
import { Alternative, Prescription, Program, SessionItem } from '../models/program.model';

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

const ALTERNATIVES: Record<string, Alternative | undefined> = {
  pullup: {
    exerciseId: 'table-row',
    prescription: rx(reps(4, 8, 12, 90), reps(4, 10, 15, 90), reps(4, 10, 15, 90)),
  },
  chinup: {
    exerciseId: 'backpack-curl',
    prescription: rx(reps(3, 10, 15, 60), reps(3, 10, 15, 60), reps(3, 8, 12, 60)),
  },
  'vbar-pullup': {
    exerciseId: 'backpack-pullover',
    prescription: rx(reps(3, 10, 15, 60), reps(3, 10, 15, 60), reps(3, 10, 15, 60)),
  },
  'side-chin': {
    exerciseId: 'backpack-row-single',
    prescription: rx(reps(3, 8, 12, 60), reps(3, 8, 12, 60), reps(3, 8, 12, 60)),
  },
  'australian-row': {
    exerciseId: 'backpack-row',
    prescription: rx(reps(3, 10, 15, 60), reps(3, 10, 15, 60), reps(3, 10, 15, 60)),
  },
  'row-supinato': {
    exerciseId: 'backpack-hammer-curl',
    prescription: rx(reps(3, 10, 15, 60), reps(3, 10, 15, 60), reps(3, 8, 12, 60)),
  },
  'scapular-pullup': {
    exerciseId: 'reverse-fly',
    prescription: rx(reps(3, 12, 15, 45), reps(3, 12, 15, 45), reps(3, 12, 15, 45)),
  },
  'dead-hang': {
    exerciseId: 'reverse-plank',
    prescription: rx(secs(3, 20, 30, 60), secs(3, 30, 45, 60), secs(3, 40, 60, 60)),
  },
  'leg-raise': {
    exerciseId: 'reverse-crunch',
    prescription: rx(reps(3, 10, 15, 45), reps(3, 10, 15, 45), reps(3, 10, 15, 45)),
  },
};

const BAND_ALTERNATIVES: Record<string, Alternative | undefined> = {
  pullup: {
    exerciseId: 'band-lat-pulldown',
    prescription: rx(reps(4, 10, 15, 90), reps(4, 10, 15, 90), reps(4, 12, 15, 90)),
  },
  chinup: {
    exerciseId: 'band-curl',
    prescription: rx(reps(3, 10, 15, 60), reps(3, 10, 15, 60), reps(3, 12, 15, 60)),
  },
  'vbar-pullup': {
    exerciseId: 'band-face-pull',
    prescription: rx(reps(3, 12, 15, 60), reps(3, 12, 15, 60), reps(3, 15, 20, 60)),
  },
  'side-chin': {
    exerciseId: 'band-row-single',
    prescription: rx(reps(3, 10, 15, 60), reps(3, 10, 15, 60), reps(3, 12, 15, 60)),
  },
  'australian-row': {
    exerciseId: 'band-row',
    prescription: rx(reps(3, 10, 15, 60), reps(3, 12, 15, 60), reps(3, 12, 15, 60)),
  },
  'row-supinato': {
    exerciseId: 'band-hammer-curl',
    prescription: rx(reps(3, 10, 15, 60), reps(3, 10, 15, 60), reps(3, 12, 15, 60)),
  },
  'scapular-pullup': {
    exerciseId: 'band-pull-apart',
    prescription: rx(reps(3, 12, 15, 45), reps(3, 15, 20, 45), reps(3, 15, 20, 45)),
  },
};

const item = (exerciseId: string, prescription: Record<Level, Prescription>): SessionItem => ({
  exerciseId,
  prescription,
  alternative: ALTERNATIVES[exerciseId],
  bandAlternative: BAND_ALTERNATIVES[exerciseId],
});

const bandItem = (exerciseId: string, prescription: Record<Level, Prescription>): SessionItem => ({
  exerciseId,
  prescription,
});

const bandRx = (min: number, max: number): Record<Level, Prescription> =>
  rx(reps(3, min, max, 45), reps(3, min, max, 45), reps(3, min + 2, max + 3, 45));

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
        item('dip', rx(reps(3, 3, 6, 120), reps(4, 6, 10, 120), reps(4, 8, 12, 120))),
        item('pike-pushup', rx(reps(3, 5, 8, 120), reps(4, 6, 10, 120), reps(4, 3, 6, 120))),
        item('pushup-declinato', rx(reps(3, 8, 12, 90), reps(3, 10, 15, 90), reps(3, 6, 10, 90))),
        item('archer-pushup', rx(reps(3, 8, 12, 90), reps(3, 5, 8, 90), reps(3, 3, 5, 120))),
        item('clock-pushup', rx(reps(3, 6, 10, 90), reps(3, 5, 8, 90), reps(3, 5, 8, 90))),
        item('diamond', rx(reps(3, 6, 10, 90), reps(3, 8, 12, 90), reps(3, 8, 12, 90))),
        item('body-up', rx(reps(3, 8, 12, 90), reps(3, 6, 10, 90), reps(3, 6, 10, 90))),
        item('handstand-hold', rx(secs(3, 20, 30, 60), secs(3, 20, 40, 60), secs(3, 30, 60, 60))),
        item('plank', rx(secs(3, 20, 30, 60), secs(3, 30, 45, 60), reps(3, 6, 10, 60))),
        item('dead-bug', rx(reps(3, 8, 12, 45), reps(3, 10, 12, 45), reps(3, 10, 12, 45))),
      ],
      bandItems: [bandItem('band-lateral-raise', bandRx(12, 15)), bandItem('band-pushdown', bandRx(12, 15)), bandItem('band-chest-fly', bandRx(12, 15))],
    },
    {
      id: 'mar-pull',
      day: 'mar',
      title: 'Pull',
      items: [
        item('pullup', rx(reps(4, 3, 5, 120), reps(4, 5, 10, 120), reps(4, 8, 12, 120))),
        item('chinup', rx(reps(3, 3, 5, 120), reps(3, 6, 10, 120), reps(3, 8, 12, 120))),
        item('vbar-pullup', rx(reps(3, 3, 6, 120), reps(3, 5, 8, 120), reps(3, 6, 10, 120))),
        item('side-chin', rx(reps(3, 5, 8, 120), reps(3, 4, 8, 120), reps(3, 3, 6, 120))),
        item('australian-row', rx(reps(3, 8, 12, 90), reps(3, 10, 15, 90), reps(3, 10, 15, 90))),
        item('row-supinato', rx(reps(3, 8, 12, 90), reps(3, 10, 15, 90), reps(3, 8, 12, 90))),
        item('scapular-pullup', rx(reps(3, 8, 10, 60), reps(3, 10, 12, 60), reps(3, 12, 15, 60))),
        item('superman', rx(reps(3, 10, 12, 45), reps(3, 8, 12, 45), reps(3, 10, 15, 45))),
        item('dead-hang', rx(secs(3, 15, 25, 60), secs(3, 30, 45, 60), secs(3, 10, 20, 60))),
        item('bicycle', rx(reps(3, 15, 20, 45), reps(3, 20, 30, 45), reps(3, 30, 40, 45))),
      ],
      bandItems: [bandItem('band-face-pull', bandRx(12, 15)), bandItem('band-curl', bandRx(10, 15))],
    },
    {
      id: 'mer-gambe',
      day: 'mer',
      title: 'Gambe + core',
      items: [
        item('bulgarian', rx(reps(3, 8, 10, 90), reps(4, 8, 12, 90), reps(4, 10, 12, 90))),
        item('squat', rx(reps(3, 15, 20, 90), reps(3, 15, 20, 90), reps(3, 12, 15, 90))),
        item('reverse-lunge', rx(reps(3, 10, 12, 60), reps(3, 10, 12, 60), reps(3, 12, 15, 60))),
        item('step-up', rx(reps(3, 10, 12, 60), reps(3, 10, 12, 60), reps(3, 12, 15, 60))),
        item('glute-bridge', rx(reps(3, 12, 15, 60), reps(3, 12, 12, 60), reps(3, 10, 12, 60))),
        item('floor-ghr', rx(reps(3, 6, 10, 90), reps(3, 6, 10, 90), reps(3, 8, 12, 90))),
        item('glute-kickback', rx(reps(3, 12, 15, 45), reps(3, 15, 20, 45), reps(3, 15, 20, 45))),
        item('calf-raise', rx(reps(3, 15, 20, 45), reps(4, 15, 20, 45), reps(4, 12, 15, 45))),
        item('leg-raise', rx(reps(3, 8, 12, 60), reps(3, 8, 12, 60), reps(3, 8, 12, 60))),
        item('plank', rx(secs(3, 30, 45, 60), secs(3, 45, 60, 60), reps(3, 6, 10, 60))),
      ],
      bandItems: [bandItem('band-glute-bridge', bandRx(12, 15)), bandItem('band-lateral-walk', bandRx(12, 15)), bandItem('band-good-morning', bandRx(12, 15))],
    },
    {
      id: 'ven-upper',
      day: 'ven',
      title: 'Upper',
      items: [
        item('pullup', rx(reps(4, 3, 5, 120), reps(4, 5, 8, 120), reps(4, 8, 12, 120))),
        item('dip', rx(reps(4, 3, 6, 120), reps(4, 6, 10, 120), reps(4, 8, 12, 120))),
        item('chest-dip', rx(reps(3, 10, 15, 90), reps(3, 6, 10, 120), reps(3, 6, 10, 120))),
        item('pushup', rx(reps(3, 10, 15, 90), reps(3, 8, 12, 90), reps(3, 4, 8, 90))),
        item('australian-row', rx(reps(3, 8, 12, 90), reps(3, 8, 12, 90), reps(3, 8, 12, 90))),
        item('pike-pushup', rx(reps(3, 5, 8, 90), reps(3, 6, 10, 90), reps(3, 3, 6, 90))),
        item('handstand-hold', rx(secs(3, 20, 30, 60), secs(3, 20, 40, 60), secs(3, 30, 60, 60))),
        item('l-sit', rx(secs(4, 10, 20, 60), secs(4, 10, 20, 60), secs(4, 10, 20, 60))),
        item('hollow', rx(secs(3, 20, 30, 45), secs(3, 30, 30, 45), secs(3, 30, 40, 45))),
        item('russian-twist', rx(reps(3, 16, 20, 45), reps(3, 20, 30, 45), reps(3, 20, 30, 45))),
      ],
      bandItems: [bandItem('band-lateral-raise', bandRx(12, 15)), bandItem('band-pushdown', bandRx(12, 15)), bandItem('band-curl', bandRx(10, 15))],
    },
    {
      id: 'sab-gambe',
      day: 'sab',
      title: 'Gambe + core',
      items: [
        item('jump-squat', rx(reps(3, 8, 8, 90), reps(4, 8, 8, 90), reps(4, 8, 8, 90))),
        item('plyo-jumps', rx(reps(3, 5, 6, 90), reps(3, 6, 8, 90), reps(3, 6, 8, 90))),
        item('lunge', rx(reps(3, 10, 12, 90), reps(3, 12, 12, 90), reps(3, 12, 15, 90))),
        item('split-jump', rx(reps(3, 8, 10, 90), reps(3, 10, 12, 90), reps(3, 10, 12, 90))),
        item('pistol', rx(reps(3, 8, 12, 90), reps(3, 5, 8, 90), reps(3, 3, 6, 90))),
        item('nordic', rx(reps(3, 8, 10, 90), reps(3, 5, 8, 90), reps(3, 5, 8, 90))),
        item('lateral-bound', rx(reps(3, 8, 10, 60), reps(3, 10, 12, 60), reps(3, 10, 12, 60))),
        item('calf-raise', rx(reps(3, 15, 20, 45), reps(4, 15, 20, 45), reps(4, 12, 15, 45))),
        item('leg-raise', rx(reps(3, 8, 12, 60), reps(3, 8, 12, 60), reps(3, 8, 12, 60))),
        item('side-plank', rx(secs(3, 20, 30, 45), secs(3, 30, 40, 45), secs(3, 40, 50, 45))),
      ],
      bandItems: [bandItem('band-squat', bandRx(12, 15)), bandItem('band-ham-curl', bandRx(12, 15)), bandItem('band-calf-raise', bandRx(15, 20))],
    },
  ],
};
