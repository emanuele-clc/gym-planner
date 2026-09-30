import { Exercise, Variant } from '../models/exercise.model';

const DB_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';

const db = (id: string): string[] => [`${DB_BASE}/${id}/0.jpg`, `${DB_BASE}/${id}/1.jpg`];

const REPDB_BASE = 'https://raw.githubusercontent.com/RepDB/exercise-dataset/main/images/flat';

const repdb = (id: string): string[] => [
  `${REPDB_BASE}/${id}-start.webp`,
  `${REPDB_BASE}/${id}-peak.webp`,
];

const repdbMain = (id: string): string[] => [`${REPDB_BASE}/${id}-main.webp`];

const repdbFrame = (id: string, part: 'start' | 'peak'): string[] => [
  `${REPDB_BASE}/${id}-${part}.webp`,
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
      base: variant('pike-terra', 'Pike push-up', repdb('pike-push-ups')),
      intermedio: variant(
        'pike-rialzato',
        'Pike push-up piedi rialzati',
        repdb('pike-push-ups'),
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
        repdb('diamond-push-ups'),
        'Piedi su una sedia.',
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
        repdb('negative-pull-ups'),
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
      base: variant('chinup-negativo', 'Chin-up negativi', repdb('negative-pull-ups'), 'Presa supina. Sali con un salto, scendi in 4-5".'),
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
      avanzato: variant('row-piedi-rialzati', 'Australian row piedi rialzati', repdb('inverted-row'), 'Piedi su una sedia.'),
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
      base: variant('hang-base', 'Dead hang', repdbMain('dead-hang')),
      intermedio: variant('hang-int', 'Dead hang', repdbMain('dead-hang')),
      avanzato: variant('hang-una-mano', 'Dead hang a una mano', db('One_Handed_Hang')),
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
      intermedio: variant('bulgaro', 'Squat bulgaro', repdb('bulgarian-split-squat'), 'Nell’immagine ci sono i manubri: tu fallo a corpo libero.'),
      avanzato: variant('bulgaro-lento', 'Squat bulgaro, discesa 3"', repdb('bulgarian-split-squat'), 'Nell’immagine ci sono i manubri: tu usa un zaino o il corpo libero.'),
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
      base: variant('calf-base', 'Calf raise a terra', repdb('bodyweight-calf-raise')),
      intermedio: variant('calf-gradino', 'Calf raise su gradino', repdb('bodyweight-calf-raise'), 'Avampiede su un gradino.'),
      avanzato: variant('calf-mono', 'Calf raise monogamba su gradino', repdb('single-leg-calf-raise'), 'Avampiede su un gradino.'),
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
      intermedio: variant('pistol-assistito', 'Pistol squat assistito', repdb('pistol-squat'), 'Appoggio a una parete o a un montante.'),
      avanzato: variant('pistol', 'Pistol squat', repdb('pistol-squat')),
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
      base: variant('nordic-molto-assistito', 'Nordic curl molto assistito', repdb('nordic-hamstring-curl'), 'Aiutati con le mani per tutta la salita.'),
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
      base: variant('support-hold', 'Support hold', repdbMain('l-sit'), 'Nell’immagine le gambe sono sollevate: per il support hold tienile a terra.'),
      intermedio: variant('l-sit-tuck', 'L-sit a ginocchia raccolte', db('Knee_Hip_Raise_On_Parallel_Bars'), 'Tieni le ginocchia raccolte in alto.'),
      avanzato: variant('l-sit-full', 'L-sit', repdbMain('l-sit')),
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
      base: variant('hollow-tuck', 'Hollow hold a ginocchia piegate', repdbMain('hollow-body-hold')),
      intermedio: variant('hollow-std', 'Hollow hold', repdbMain('hollow-body-hold')),
      avanzato: variant('hollow-arms', 'Hollow hold, braccia in alto', repdbMain('hollow-body-hold')),
    },
  },
  {
    id: 'clock-pushup',
    name: 'Push-up: variazioni mani',
    muscles: ['petto', 'spalle', 'tricipiti'],
    equipment: ['nessuno'],
    cues: [
      'Corpo in linea, mani circa larghezza spalle',
      'Petto verso terra in discesa',
      'Spingi con decisione fino a stendere i gomiti',
    ],
    variants: {
      base: variant('pushup-mani', 'Push-up mani larghe e strette', db('Pushups_Close_and_Wide_Hand_Positions')),
      intermedio: variant('clock', 'Clock push-up', db('Clock_Push-Up')),
      avanzato: variant('clock-pausa', 'Clock push-up con pausa 2"', db('Clock_Push-Up'), 'Pausa 2" con il petto vicino a terra.'),
    },
  },
  {
    id: 'body-up',
    name: 'Body-up',
    muscles: ['tricipiti'],
    equipment: ['nessuno'],
    cues: [
      'Parti in plank sugli avambracci',
      'Spingi sui palmi fino a stendere i gomiti',
      'Corpo rigido, bacino fermo',
    ],
    variants: {
      base: variant('body-up-ginocchia', 'Body-up sulle ginocchia', db('Body-Up'), 'Appoggia le ginocchia a terra.'),
      intermedio: variant('body-up-std', 'Body-up', db('Body-Up')),
      avanzato: variant('body-up-pausa', 'Body-up con pausa 2"', db('Body-Up'), 'Pausa 2" a gomiti stesi.'),
    },
  },
  {
    id: 'vbar-pullup',
    name: 'Trazioni presa neutra',
    muscles: ['dorso', 'bicipiti'],
    equipment: ['sbarra'],
    cues: ['Presa neutra, petto in fuori', 'Porta il petto verso la sbarra', 'Scendi controllato, braccia tese'],
    variants: {
      base: variant('trazioni-elastico', 'Trazioni con elastico', repdb('band-assisted-pull-ups'), 'Elastico attorno alla sbarra e sotto il piede.'),
      intermedio: variant('vbar', 'Trazioni presa neutra', db('V-Bar_Pullup'), 'Servono maniglie a V. Senza, usa la presa prona.'),
      avanzato: variant('vbar-pausa', 'Trazioni presa neutra con pausa 2"', db('V-Bar_Pullup'), 'Pausa 2" con il mento sopra la sbarra.'),
    },
  },
  {
    id: 'superman',
    name: 'Catena posteriore',
    muscles: ['lombari', 'glutei'],
    equipment: ['nessuno'],
    cues: ['Sdraiato prono, braccia in avanti', 'Solleva braccia, gambe e petto insieme', 'Tieni 2" in alto senza inarcare il collo'],
    variants: {
      base: variant('superman', 'Superman', db('Superman')),
      intermedio: variant('superman-pausa', 'Superman con pausa 2"', db('Superman')),
      avanzato: variant(
        'iperestensioni',
        'Iperestensioni a corpo libero',
        db('Hyperextensions_With_No_Hyperextension_Bench'),
        'Serve un piano rialzato e qualcosa che blocchi le gambe.',
      ),
    },
  },
  {
    id: 'step-up',
    name: 'Step-up',
    muscles: ['glutei', 'quadricipiti'],
    equipment: ['sedia'],
    cues: ['Sedia o gradino stabile', 'Spingi con la gamba sopra, senza slancio', 'Porta il ginocchio opposto in alto'],
    variants: {
      base: variant('stepup-base', 'Step-up', db('Step-up_with_Knee_Raise')),
      intermedio: variant('stepup-ginocchio', 'Step-up con ginocchio alto', db('Step-up_with_Knee_Raise')),
      avanzato: variant('stepup-zaino', 'Step-up con zaino', db('Step-up_with_Knee_Raise'), 'Zaino con peso.'),
    },
  },
  {
    id: 'split-jump',
    name: 'Salti in affondo',
    muscles: ['quadricipiti', 'glutei'],
    equipment: ['nessuno'],
    cues: ['Parti in affondo, ginocchio posteriore vicino a terra', 'Salta in verticale e riatterra in affondo', 'Atterra morbido, ginocchio in linea con il piede'],
    variants: {
      base: variant('split-jump-base', 'Split jump', db('Split_Jump')),
      intermedio: variant('split-jump-int', 'Split jump', db('Split_Jump')),
      avanzato: variant('scissors-jump', 'Scissors jump', db('Scissors_Jump'), 'Cambia le gambe in aria.'),
    },
  },
  {
    id: 'plyo-jumps',
    name: 'Salti pliometrici',
    muscles: ['quadricipiti', 'glutei', 'polpacci'],
    equipment: ['sedia'],
    cues: ['Braccia in spinta, salta con decisione', 'Atterra morbido a ginocchia flesse', 'Recupera del tutto tra le ripetizioni'],
    variants: {
      base: variant('long-jump', 'Salto in lungo da fermo', db('Standing_Long_Jump')),
      intermedio: variant('bench-jump', 'Bench jump', db('Bench_Jump'), 'Salta oltre una panca o un gradino basso.'),
      avanzato: variant('tuck-jump', 'Knee tuck jump', db('Knee_Tuck_Jump')),
    },
  },
  {
    id: 'lateral-bound',
    name: 'Salti laterali',
    muscles: ['adduttori', 'glutei'],
    equipment: ['nessuno'],
    cues: ['Parti in mezzo squat', 'Salta di lato il più lontano possibile', 'Rimbalza subito dal lato opposto'],
    variants: {
      base: variant('bound-base', 'Salti laterali', db('Lateral_Bound')),
      intermedio: variant('bound-int', 'Salti laterali', db('Lateral_Bound')),
      avanzato: variant('bound-fermo', 'Salti laterali con atterraggio fermo 2"', db('Lateral_Bound')),
    },
  },
  {
    id: 'glute-kickback',
    name: 'Kickback glutei',
    muscles: ['glutei'],
    equipment: ['nessuno'],
    cues: ['Quadrupedia, schiena piatta', 'Calcia il tallone verso il soffitto, ginocchio a 90°', 'Contrai il gluteo in alto'],
    variants: {
      base: variant('kick-base', 'Kickback glutei', db('Glute_Kickback')),
      intermedio: variant('kick-int', 'Kickback glutei', db('Glute_Kickback')),
      avanzato: variant('kick-pausa', 'Kickback glutei con pausa 2"', db('Glute_Kickback')),
    },
  },
  {
    id: 'mountain-climber',
    name: 'Mountain climber',
    muscles: ['core', 'quadricipiti'],
    equipment: ['nessuno'],
    cues: ['Mani sotto le spalle, corpo in linea', 'Alterna le ginocchia verso il petto', 'Bacino stabile'],
    variants: {
      base: variant('climber-base', 'Mountain climber', db('Mountain_Climbers')),
      intermedio: variant('climber-int', 'Mountain climber', db('Mountain_Climbers')),
      avanzato: variant('climber-avv', 'Mountain climber', db('Mountain_Climbers')),
    },
  },
  {
    id: 'dead-bug',
    name: 'Dead bug',
    muscles: ['core'],
    equipment: ['nessuno'],
    cues: ['Lombare schiacciata a terra', 'Estendi braccio e gamba opposti', 'Torna indietro senza staccare la lombare'],
    variants: {
      base: variant('deadbug-base', 'Dead bug', db('Dead_Bug')),
      intermedio: variant('deadbug-int', 'Dead bug', db('Dead_Bug')),
      avanzato: variant('deadbug-avv', 'Dead bug', db('Dead_Bug'), 'Discesa lenta, 3" per lato.'),
    },
  },
  {
    id: 'bicycle',
    name: 'Bicycle crunch',
    muscles: ['core'],
    equipment: ['nessuno'],
    cues: ['Lombare aderente a terra', 'Gomito verso il ginocchio opposto', 'Movimento lento e controllato'],
    variants: {
      base: variant('bike-base', 'Bicycle crunch', db('Air_Bike')),
      intermedio: variant('bike-int', 'Bicycle crunch', db('Air_Bike')),
      avanzato: variant('bike-avv', 'Bicycle crunch', db('Air_Bike')),
    },
  },
  {
    id: 'russian-twist',
    name: 'Russian twist',
    muscles: ['core'],
    equipment: ['nessuno'],
    cues: ['Busto a V, schiena dritta', 'Ruota il busto, non solo le braccia', 'Piedi appoggiati o sollevati'],
    variants: {
      base: variant('twist-base', 'Russian twist', db('Russian_Twist')),
      intermedio: variant('twist-int', 'Russian twist', db('Russian_Twist')),
      avanzato: variant('twist-zaino', 'Russian twist con zaino', db('Russian_Twist'), 'Zaino con peso, piedi sollevati.'),
    },
  },
  {
    id: 'chest-dip',
    name: 'Dip petto',
    muscles: ['petto', 'tricipiti', 'spalle'],
    equipment: ['parallele'],
    cues: ['Busto inclinato in avanti', 'Gomiti leggermente larghi', 'Scendi fino a sentire lo stiramento del petto'],
    variants: {
      base: variant('chest-dip-base', 'Push-up larghi inclinati', db('Incline_Push-Up_Wide'), 'Mani su un rialzo.'),
      intermedio: variant('chest-dip-int', 'Dip petto, busto in avanti', db('Dips_-_Chest_Version')),
      avanzato: variant('chest-dip-avv', 'Dip petto zavorrati', db('Dips_-_Chest_Version'), 'Zaino con peso.'),
    },
  },
  {
    id: 'archer-pushup',
    name: 'Push-up unilaterali',
    muscles: ['petto', 'tricipiti', 'spalle'],
    equipment: ['nessuno'],
    cues: ['Mani larghe, corpo in linea', 'Scendi su un lato, l’altro braccio resta teso', 'Alterna i lati a ogni ripetizione'],
    variants: {
      base: variant('archer-base', 'Push-up larghi', db('Push-Up_Wide')),
      intermedio: variant('archer-int', 'Archer push-up', repdb('archer-push-ups')),
      avanzato: variant('archer-avv', 'Push-up a un braccio', db('Single-Arm_Push-Up')),
    },
  },
  {
    id: 'handstand-hold',
    name: 'Verticale al muro',
    muscles: ['spalle', 'core'],
    equipment: ['nessuno'],
    cues: ['Mani a circa 15 cm dal muro', 'Spingi il pavimento, spalle alte', 'Corpo in linea, addome contratto'],
    variants: {
      base: variant('wall-plank', 'Pike hold, piedi a terra', repdbFrame('pike-push-ups', 'peak')),
      intermedio: variant('handstand-pancia', 'Handstand hold, pancia al muro', repdbFrame('handstand-push-ups', 'start'), 'Nell’immagine le mani sono su parallette: tu fallo contro il muro.'),
      avanzato: variant('handstand-schiena', 'Handstand hold, schiena al muro', repdbFrame('handstand-push-ups', 'start'), 'Schiena rivolta al muro. Nell’immagine le mani sono su parallette.'),
    },
  },
  {
    id: 'row-supinato',
    name: 'Australian row presa supina',
    muscles: ['bicipiti', 'dorso'],
    equipment: ['sbarra'],
    cues: ['Palmi verso di te, larghezza spalle', 'Corpo rigido, petto alla sbarra', 'Gomiti vicini al busto'],
    variants: {
      base: variant('row-sup-base', 'Row presa supina, corpo più in piedi', db('Inverted_Row'), 'Presa supina: i frame mostrano la presa prona.'),
      intermedio: variant('row-sup-int', 'Australian row presa supina', db('Inverted_Row'), 'Presa supina: i frame mostrano la presa prona.'),
      avanzato: variant('row-sup-avv', 'Row presa supina, piedi rialzati', repdb('inverted-row'), 'Piedi su una sedia, presa supina.'),
    },
  },
  {
    id: 'side-chin',
    name: 'Trazioni unilaterali',
    muscles: ['dorso', 'bicipiti'],
    equipment: ['sbarra'],
    cues: ['Presa larga, petto in fuori', 'Sali verso una mano, l’altro braccio resta disteso', 'Alterna i lati'],
    variants: {
      base: variant('side-chin-base', 'Chin-up', db('Chin-Up')),
      intermedio: variant('side-chin-int', 'Trazioni laterali', db('Side_To_Side_Chins')),
      avanzato: variant('archer-pullup', 'Archer pull-up', repdb('archer-pull-ups')),
    },
  },
  {
    id: 'reverse-lunge',
    name: 'Affondo indietro',
    muscles: ['glutei', 'quadricipiti'],
    equipment: ['nessuno'],
    cues: ['Passo indietro incrociato', 'Busto eretto, peso sul piede davanti', 'Spingi con il tallone anteriore'],
    variants: {
      base: variant('rev-lunge-base', 'Affondo indietro incrociato', db('Crossover_Reverse_Lunge')),
      intermedio: variant('rev-lunge-int', 'Affondo indietro incrociato', db('Crossover_Reverse_Lunge')),
      avanzato: variant('rev-lunge-zaino', 'Affondo indietro con zaino', db('Crossover_Reverse_Lunge'), 'Zaino con peso.'),
    },
  },
  {
    id: 'floor-ghr',
    name: 'Glute-ham raise a terra',
    muscles: ['femorali', 'glutei'],
    equipment: ['nessuno'],
    cues: ['Corpo rigido dalle ginocchia alla testa', 'Scendi lentamente in avanti', 'Risali spingendo con i femorali'],
    variants: {
      base: variant('ghr-base', 'Glute-ham raise a terra', db('Floor_Glute-Ham_Raise'), 'Blocca i piedi sotto un mobile pesante o un divano.'),
      intermedio: variant('ghr-int', 'Glute-ham raise a terra', db('Floor_Glute-Ham_Raise'), 'Blocca i piedi sotto un mobile pesante o un divano.'),
      avanzato: variant('ghr-avv', 'Glute-ham raise a terra, discesa 4"', db('Floor_Glute-Ham_Raise'), 'Blocca i piedi sotto un mobile pesante o un divano.'),
    },
  },
];
