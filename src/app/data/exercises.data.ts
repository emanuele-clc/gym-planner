import { Exercise, Variant } from '../models/exercise.model';

const DB_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';

const db = (id: string): string[] => [`${DB_BASE}/${id}/0.jpg`, `${DB_BASE}/${id}/1.jpg`];

const local = (slug: string): string[] => [
  `assets/exercises/${slug}/0.jpg`,
  `assets/exercises/${slug}/1.jpg`,
];

const variant = (id: string, name: string, frames: string[], note?: string): Variant => ({
  id,
  name,
  frames,
  note,
});

export const EXERCISES: Exercise[] = [
  {
    id: 'dip',
    name: 'Dip',
    muscles: ['petto', 'tricipiti', 'spalle'],
    equipment: ['parallele', 'sedia'],
    cues: [
      'Spalle lontane dalle orecchie',
      'Gomiti vicini al busto',
      'Scendi fino a spalle all’altezza dei gomiti',
    ],
    variants: {
      base: variant('dip-sedia', 'Dip su sedia', db('Bench_Dips')),
      intermedio: variant('dip-parallele', 'Dip alle parallele', db('Dips_-_Triceps_Version')),
      avanzato: variant(
        'dip-zavorrato',
        'Dip zavorrato',
        db('Dips_-_Triceps_Version'),
        'Zaino con peso. Stesso movimento delle parallele.',
      ),
    },
  },
  {
    id: 'pike-pushup',
    name: 'Pike push-up',
    muscles: ['spalle', 'tricipiti'],
    equipment: ['nessuno', 'sedia'],
    cues: [
      'Fianchi alti, corpo a V rovesciata',
      'Testa tra le braccia',
      'Scendi con la testa verso terra, tra le mani',
    ],
    variants: {
      base: variant('pike-terra', 'Pike push-up', local('pike-pushup')),
      intermedio: variant(
        'pike-rialzato',
        'Pike push-up piedi rialzati',
        local('pike-pushup-rialzato'),
        'Piedi su una sedia o un gradino.',
      ),
      avanzato: variant(
        'handstand-pushup',
        'Handstand push-up al muro',
        db('Handstand_Push-Ups'),
      ),
    },
  },
  {
    id: 'pushup-declinato',
    name: 'Push-up: petto e spalle',
    muscles: ['petto', 'spalle', 'tricipiti'],
    equipment: ['sedia'],
    cues: [
      'Corpo in linea, glutei contratti',
      'Gomiti a circa 45° dal busto',
      'Petto a un pugno da terra',
    ],
    variants: {
      base: variant('pushup-inclinato', 'Push-up inclinati', db('Incline_Push-Up'), 'Mani su un rialzo.'),
      intermedio: variant('pushup-declinato', 'Push-up declinati', db('Decline_Push-Up'), 'Piedi su una sedia.'),
      avanzato: variant('pushup-plio', 'Push-up pliometrici', db('Plyo_Push-up')),
    },
  },
  {
    id: 'diamond',
    name: 'Diamond push-up',
    muscles: ['tricipiti', 'petto'],
    equipment: ['nessuno', 'sedia'],
    cues: [
      'Mani sotto il petto, indici e pollici a contatto',
      'Gomiti vicini alle costole',
      'Spingi fino a bloccare i gomiti',
    ],
    variants: {
      base: variant('diamond-inclinato', 'Diamond push-up inclinati', db('Incline_Push-Up_Close-Grip')),
      intermedio: variant('diamond-standard', 'Diamond push-up', db('Push-Ups_-_Close_Triceps_Position')),
      avanzato: variant(
        'diamond-rialzato',
        'Diamond push-up piedi rialzati',
        local('diamond-rialzato'),
      ),
    },
  },
  {
    id: 'plank',
    name: 'Plank',
    muscles: ['core'],
    equipment: ['nessuno'],
    cues: [
      'Gomiti sotto le spalle',
      'Glutei e addome contratti',
      'Bacino in linea con spalle e caviglie',
    ],
    variants: {
      base: variant('plank-base', 'Plank', db('Plank')),
      intermedio: variant('plank-int', 'Plank', db('Plank')),
      avanzato: variant('plank-side-pushup', 'Push-up to side plank', db('Push_Up_to_Side_Plank')),
    },
  },
  {
    id: 'pullup',
    name: 'Trazioni',
    muscles: ['dorso', 'bicipiti'],
    equipment: ['sbarra'],
    cues: [
      'Parti da braccia tese, spalle basse',
      'Porta il petto verso la sbarra',
      'Scendi in 2-3" senza rimbalzo',
    ],
    variants: {
      base: variant(
        'pullup-negativa',
        'Trazioni negative',
        local('trazione-negativa'),
        'Sali con un salto, scendi in 4-5".',
      ),
      intermedio: variant('pullup-prona', 'Trazioni presa prona', db('Pullups')),
      avanzato: variant(
        'pullup-zavorrata',
        'Trazioni zavorrate',
        db('Pullups'),
        'Zaino con peso. Stesso movimento delle trazioni standard.',
      ),
    },
  },
  {
    id: 'chinup',
    name: 'Chin-up',
    muscles: ['bicipiti', 'dorso'],
    equipment: ['sbarra'],
    cues: ['Presa supina, larghezza spalle', 'Gomiti verso le anche', 'Mento sopra la sbarra'],
    variants: {
      base: variant('chinup-negativo', 'Chin-up negativi', local('chinup-negativo'), 'Sali con un salto, scendi in 4-5".'),
      intermedio: variant('chinup-std', 'Chin-up', db('Chin-Up')),
      avanzato: variant('chinup-zavorrato', 'Chin-up zavorrati', db('Chin-Up'), 'Zaino con peso.'),
    },
  },
  {
    id: 'australian-row',
    name: 'Australian row',
    muscles: ['dorso', 'bicipiti'],
    equipment: ['sbarra'],
    cues: [
      'Corpo rigido dalle caviglie alla testa',
      'Porta il petto alla sbarra',
      'Scapole unite in alto',
    ],
    variants: {
      base: variant('row-inclinata', 'Australian row, corpo più in piedi', db('Inverted_Row'), 'Più il corpo è verticale, più è facile.'),
      intermedio: variant('row-std', 'Australian row', db('Inverted_Row')),
      avanzato: variant('row-piedi-rialzati', 'Australian row piedi rialzati', local('row-piedi-rialzati'), 'Piedi su una sedia.'),
    },
  },
  {
    id: 'scapular-pullup',
    name: 'Scapular pull-up',
    muscles: ['dorso'],
    equipment: ['sbarra'],
    cues: [
      'Braccia tese per tutto il movimento',
      'Abbassa le scapole verso le tasche',
      'Solleva il corpo di pochi centimetri',
    ],
    variants: {
      base: variant('scap-base', 'Scapular pull-up', db('Scapular_Pull-Up')),
      intermedio: variant('scap-int', 'Scapular pull-up', db('Scapular_Pull-Up')),
      avanzato: variant('scap-avv', 'Scapular pull-up', db('Scapular_Pull-Up')),
    },
  },
  {
    id: 'dead-hang',
    name: 'Dead hang',
    muscles: ['dorso', 'bicipiti'],
    equipment: ['sbarra'],
    cues: [
      'Pollice attorno alla sbarra',
      'Spalle attive, non affondare',
      'Respira regolarmente',
    ],
    variants: {
      base: variant('hang-base', 'Dead hang', local('dead-hang')),
      intermedio: variant('hang-int', 'Dead hang', local('dead-hang')),
      avanzato: variant('hang-una-mano', 'Dead hang a una mano', local('dead-hang-una-mano')),
    },
  },
  {
    id: 'bulgarian',
    name: 'Squat bulgaro',
    muscles: ['quadricipiti', 'glutei'],
    equipment: ['sedia'],
    cues: [
      'Piede posteriore appoggiato su sedia o gradino',
      'Busto leggermente in avanti',
      'Ginocchio anteriore in linea con il piede',
    ],
    variants: {
      base: variant('split-squat', 'Split squat', db('Split_Squats')),
      intermedio: variant('bulgaro', 'Squat bulgaro', local('squat-bulgaro')),
      avanzato: variant('bulgaro-lento', 'Squat bulgaro, discesa 3"', local('squat-bulgaro')),
    },
  },
  {
    id: 'squat',
    name: 'Squat',
    muscles: ['quadricipiti', 'glutei'],
    equipment: ['nessuno'],
    cues: [
      'Piedi larghi come le spalle',
      'Schiena neutra in discesa',
      'Spingi con tutto il piede, talloni a terra',
    ],
    variants: {
      base: variant('squat-base', 'Squat a corpo libero', db('Bodyweight_Squat')),
      intermedio: variant('squat-lento', 'Squat lento, discesa 3"', db('Bodyweight_Squat')),
      avanzato: variant('squat-pausa', 'Squat con pausa 3"', db('Bodyweight_Squat')),
    },
  },
  {
    id: 'glute-bridge',
    name: 'Glute bridge',
    muscles: ['glutei', 'femorali'],
    equipment: ['nessuno'],
    cues: ['Piedi vicini ai glutei', 'Spingi con i talloni', 'Blocca 1" in alto contraendo i glutei'],
    variants: {
      base: variant('bridge-base', 'Glute bridge', db('Butt_Lift_Bridge')),
      intermedio: variant('bridge-mono', 'Glute bridge monogamba', db('Single_Leg_Glute_Bridge')),
      avanzato: variant('bridge-mono-pausa', 'Glute bridge monogamba con pausa 2"', db('Single_Leg_Glute_Bridge')),
    },
  },
  {
    id: 'calf-raise',
    name: 'Calf raise',
    muscles: ['polpacci'],
    equipment: ['nessuno'],
    cues: ['Avampiede su un gradino', 'Sali il più in alto possibile', 'Scendi lentamente sotto il gradino'],
    variants: {
      base: variant('calf-base', 'Calf raise a terra', local('calf-raise')),
      intermedio: variant('calf-gradino', 'Calf raise su gradino', local('calf-raise')),
      avanzato: variant('calf-mono', 'Calf raise monogamba su gradino', local('calf-raise')),
    },
  },
  {
    id: 'leg-raise',
    name: 'Leg raise',
    muscles: ['core'],
    equipment: ['sbarra'],
    cues: [
      'Bacino leggermente retroverso',
      'Gambe tese, sali senza slancio',
      'Scendi in 2-3" senza dondolare',
    ],
    variants: {
      base: variant('legraise-terra', 'Leg raise da sdraiato', db('Flat_Bench_Lying_Leg_Raise')),
      intermedio: variant('legraise-sbarra', 'Leg raise alla sbarra', db('Hanging_Leg_Raise')),
      avanzato: variant('toes-to-bar', 'Toes to bar', db('Hanging_Pike')),
    },
  },
  {
    id: 'jump-squat',
    name: 'Jump squat',
    muscles: ['quadricipiti', 'glutei', 'polpacci'],
    equipment: ['nessuno'],
    cues: [
      'Scendi a 90° e salta in verticale',
      'Atterra morbido, punte poi tutto il piede',
      'Interrompi la serie se la tecnica cala',
    ],
    variants: {
      base: variant('jump-base', 'Jump squat', db('Freehand_Jump_Squat')),
      intermedio: variant('jump-int', 'Jump squat', db('Freehand_Jump_Squat')),
      avanzato: variant('rocket-jump', 'Rocket jump', db('Rocket_Jump')),
    },
  },
  {
    id: 'lunge',
    name: 'Affondi camminati',
    muscles: ['quadricipiti', 'glutei'],
    equipment: ['nessuno'],
    cues: ['Passo lungo, busto eretto', 'Ginocchio posteriore vicino al suolo', 'Ginocchio anteriore in linea con il piede'],
    variants: {
      base: variant('lunge-base', 'Affondi camminati', db('Bodyweight_Walking_Lunge')),
      intermedio: variant('lunge-int', 'Affondi camminati', db('Bodyweight_Walking_Lunge')),
      avanzato: variant('lunge-zaino', 'Affondi camminati con zaino', db('Bodyweight_Walking_Lunge'), 'Zaino con peso.'),
    },
  },
  {
    id: 'pistol',
    name: 'Pistol squat',
    muscles: ['quadricipiti', 'glutei'],
    equipment: ['sedia'],
    cues: ['Gamba libera tesa in avanti', 'Busto in avanti come contrappeso', 'Scendi controllato, tallone a terra'],
    variants: {
      base: variant('sit-squat', 'Squat a sedia', db('Sit_Squats'), 'Siediti e rialzati su una gamba sola con appoggio.'),
      intermedio: variant('pistol-assistito', 'Pistol squat assistito', local('pistol-squat'), 'Appoggio a una parete o a un montante.'),
      avanzato: variant('pistol', 'Pistol squat', local('pistol-squat')),
    },
  },
  {
    id: 'nordic',
    name: 'Nordic curl',
    muscles: ['femorali'],
    equipment: ['nessuno'],
    cues: [
      'Caviglie bloccate, ginocchia su appoggio morbido',
      'Corpo rigido dalle ginocchia alla testa',
      'Scendi il più lentamente possibile',
    ],
    variants: {
      base: variant('hamstring-walkout', 'Hamstring walkout', local('hamstring-walkout')),
      intermedio: variant('nordic-assistito', 'Nordic curl assistito', db('Natural_Glute_Ham_Raise'), 'Aiutati con le mani per risalire.'),
      avanzato: variant('nordic', 'Nordic curl', db('Natural_Glute_Ham_Raise')),
    },
  },
  {
    id: 'side-plank',
    name: 'Plank laterale',
    muscles: ['core'],
    equipment: ['nessuno'],
    cues: ['Gomito sotto la spalla', 'Bacino alto, corpo in linea', 'Non ruotare il busto'],
    variants: {
      base: variant('side-base', 'Plank laterale', db('Side_Bridge')),
      intermedio: variant('side-int', 'Plank laterale', db('Side_Bridge')),
      avanzato: variant('side-avv', 'Plank laterale', db('Side_Bridge')),
    },
  },
  {
    id: 'pushup',
    name: 'Push-up: progressione',
    muscles: ['petto', 'tricipiti', 'spalle'],
    equipment: ['nessuno'],
    cues: ['Mani sotto le spalle', 'Corpo in linea, glutei contratti', 'Petto a un pugno da terra'],
    variants: {
      base: variant('pushup-std', 'Push-up', db('Pushups')),
      intermedio: variant('pushup-larghi', 'Push-up larghi', db('Push-Up_Wide')),
      avanzato: variant('pushup-1braccio', 'Push-up a un braccio', db('Single-Arm_Push-Up')),
    },
  },
  {
    id: 'l-sit',
    name: 'L-sit',
    muscles: ['core', 'tricipiti'],
    equipment: ['parallele'],
    cues: ['Spalle spinte verso il basso', 'Braccia bloccate', 'Gambe unite, punte estese'],
    variants: {
      base: variant('support-hold', 'Support hold', local('support-hold')),
      intermedio: variant('l-sit-tuck', 'L-sit a ginocchia raccolte', local('l-sit-tuck')),
      avanzato: variant('l-sit-full', 'L-sit', local('l-sit')),
    },
  },
  {
    id: 'hollow',
    name: 'Hollow body hold',
    muscles: ['core'],
    equipment: ['nessuno'],
    cues: [
      'Zona lombare aderente al pavimento',
      'Braccia e gambe tese, scapole staccate',
      'Se la lombare si stacca, alza le gambe',
    ],
    variants: {
      base: variant('hollow-tuck', 'Hollow hold a ginocchia piegate', local('hollow-hold')),
      intermedio: variant('hollow-std', 'Hollow hold', local('hollow-hold')),
      avanzato: variant('hollow-arms', 'Hollow hold, braccia in alto', local('hollow-hold')),
    },
  },
];
