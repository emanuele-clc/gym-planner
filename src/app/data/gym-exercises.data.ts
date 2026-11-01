import { Exercise, Variant } from '../models/exercise.model';

/**
 * Esercizi per la palestra al chiuso. Attrezzatura disponibile (dalle foto):
 * rack con Smith machine e sbarra per trazioni, bilanciere e dischi, manubri 2-26 kg,
 * panca regolabile, cavo regolabile (Adjustable Pulley), Pectoral / Reverse fly,
 * Leg extension / Leg curl, multistazione con chest press, cyclette, ellittica, tapis roulant.
 */

const DB_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';

const db = (id: string): string[] => [`${DB_BASE}/${id}/0.jpg`, `${DB_BASE}/${id}/1.jpg`];

const variant = (id: string, name: string, frames: string[], note?: string): Variant => ({
  id,
  name,
  frames,
  note,
});

export const GYM_EXERCISES: Exercise[] = [
  // ——— Petto ———
  {
    id: 'bench-press',
    name: 'Panca piana',
    muscles: ['petto', 'tricipiti', 'spalle'],
    equipment: ['bilanciere', 'smith', 'panca'],
    cues: [
      'Scapole addotte e depresse, piedi a terra',
      'Bilanciere sulla linea dei capezzoli, gomiti a 45-60°',
      'Scendi in 2-3" e spingi senza staccare i glutei',
    ],
    variants: {
      base: variant('bench-smith', 'Panca piana al Smith', db('Smith_Machine_Bench_Press'), 'Panca regolabile in piano dentro il rack.'),
      intermedio: variant('bench-bilanciere', 'Panca piana bilanciere', db('Barbell_Bench_Press_-_Medium_Grip'), 'Braccetti di sicurezza appena sotto l’altezza del petto.'),
      avanzato: variant('bench-fermo', 'Panca piana con fermo al petto', db('Barbell_Bench_Press_-_Medium_Grip'), '1" di pausa sul petto, poi spingi. Nessun rimbalzo.'),
    },
  },
  {
    id: 'incline-press',
    name: 'Panca inclinata',
    muscles: ['petto', 'spalle', 'tricipiti'],
    equipment: ['manubri', 'smith', 'panca'],
    cues: [
      'Schienale a 30°: più inclinato lavorano le spalle',
      'Manubri sopra la parte alta del petto',
      'In basso senti l’allungamento, non il dolore alla spalla',
    ],
    variants: {
      base: variant('incline-smith', 'Panca inclinata al Smith', db('Smith_Machine_Incline_Bench_Press')),
      intermedio: variant('incline-manubri', 'Panca inclinata manubri', db('Incline_Dumbbell_Press')),
      avanzato: variant('incline-manubri-tempo', 'Panca inclinata manubri, discesa 3"', db('Incline_Dumbbell_Press'), 'Discesa in 3", 1" di pausa in basso.'),
    },
  },
  {
    id: 'db-bench',
    name: 'Panca piana manubri',
    muscles: ['petto', 'tricipiti', 'spalle'],
    equipment: ['manubri', 'panca'],
    cues: [
      'Porta i manubri in posizione appoggiandoli sulle ginocchia',
      'Polsi sopra i gomiti per tutto il movimento',
      'Chiudi in alto senza far sbattere i manubri',
    ],
    variants: {
      base: variant('dbbench-neutra', 'Panca manubri presa neutra', db('Dumbbell_Bench_Press_with_Neutral_Grip'), 'Palmi uno di fronte all’altro: più facile per le spalle.'),
      intermedio: variant('dbbench-std', 'Panca piana manubri', db('Dumbbell_Bench_Press')),
      avanzato: variant('dbbench-tempo', 'Panca piana manubri, discesa 3"', db('Dumbbell_Bench_Press'), 'Discesa in 3", spinta esplosiva.'),
    },
  },
  {
    id: 'chest-press',
    name: 'Chest press',
    muscles: ['petto', 'tricipiti'],
    equipment: ['macchina'],
    cues: [
      'Sedile regolato con le maniglie all’altezza del petto',
      'Schiena appoggiata, scapole strette',
      'Non bloccare i gomiti in fondo',
    ],
    variants: {
      base: variant('chestpress-base', 'Chest press (multistazione)', db('Machine_Bench_Press')),
      intermedio: variant('chestpress-int', 'Chest press (multistazione)', db('Machine_Bench_Press')),
      avanzato: variant('chestpress-avv', 'Chest press, discesa 4"', db('Machine_Bench_Press'), 'Ultima serie: a cedimento, poi scala il peso del 30% e continua.'),
    },
  },
  {
    id: 'pec-fly',
    name: 'Pectoral machine',
    muscles: ['petto'],
    equipment: ['macchina'],
    cues: [
      'Sedile con le maniglie all’altezza delle spalle',
      'Gomiti leggermente piegati e fermi',
      'Chiudi abbracciando, apri fino a sentire l’allungamento',
    ],
    variants: {
      base: variant('pecfly-base', 'Pectoral machine', db('Butterfly')),
      intermedio: variant('pecfly-int', 'Pectoral machine', db('Butterfly')),
      avanzato: variant('pecfly-avv', 'Pectoral machine, pausa 2"', db('Butterfly'), '2" di pausa a braccia chiuse.'),
    },
  },

  // ——— Spalle ———
  {
    id: 'shoulder-press',
    name: 'Shoulder press',
    muscles: ['spalle', 'tricipiti'],
    equipment: ['manubri', 'bilanciere', 'smith', 'panca'],
    cues: [
      'Addome contratto, niente iperestensione della schiena',
      'Gomiti leggermente avanti rispetto al busto',
      'Spingi fino a braccia tese sopra la testa',
    ],
    variants: {
      base: variant('ohp-smith', 'Shoulder press al Smith, seduto', db('Smith_Machine_Overhead_Shoulder_Press'), 'Panca con schienale verticale dentro il rack.'),
      intermedio: variant('ohp-manubri', 'Shoulder press manubri, seduto', db('Seated_Dumbbell_Press')),
      avanzato: variant('ohp-bilanciere', 'Military press bilanciere in piedi', db('Standing_Military_Press'), 'Parti dal rack con il bilanciere all’altezza delle clavicole.'),
    },
  },
  {
    id: 'lateral-raise',
    name: 'Alzate laterali',
    muscles: ['spalle'],
    equipment: ['manubri', 'cavo'],
    cues: [
      'Gomiti leggermente piegati, mignolo non più alto del pollice',
      'Sali fino all’altezza delle spalle',
      'Scendi lento, senza slancio col busto',
    ],
    variants: {
      base: variant('lat-raise-base', 'Alzate laterali manubri', db('Side_Lateral_Raise'), 'Parti da 4-6 kg dalla rastrelliera cromata.'),
      intermedio: variant('lat-raise-int', 'Alzate laterali manubri', db('Side_Lateral_Raise')),
      avanzato: variant('lat-raise-cavo', 'Alzate laterali al cavo, un braccio', db('Cable_Seated_Lateral_Raise'), 'Puleggia in basso, maniglia singola. Tensione costante anche in basso.'),
    },
  },
  {
    id: 'reverse-fly-machine',
    name: 'Reverse fly',
    muscles: ['spalle', 'dorso'],
    equipment: ['macchina'],
    cues: [
      'Stessa macchina della pectoral: siediti col petto verso lo schienale',
      'Braccia tese, apri portando le mani indietro',
      'Spalle basse, non alzarle verso le orecchie',
    ],
    variants: {
      base: variant('revfly-base', 'Reverse fly alla macchina', db('Reverse_Machine_Flyes')),
      intermedio: variant('revfly-int', 'Reverse fly alla macchina', db('Reverse_Machine_Flyes')),
      avanzato: variant('revfly-avv', 'Reverse fly alla macchina, pausa 2"', db('Reverse_Machine_Flyes'), '2" di pausa a braccia aperte.'),
    },
  },
  {
    id: 'face-pull',
    name: 'Face pull',
    muscles: ['spalle', 'dorso'],
    equipment: ['cavo'],
    cues: [
      'Puleggia all’altezza della fronte, corda',
      'Tira verso il viso separando le mani',
      'Gomiti alti, chiudi ruotando le mani indietro',
    ],
    variants: {
      base: variant('facepull-base', 'Face pull al cavo', db('Face_Pull')),
      intermedio: variant('facepull-int', 'Face pull al cavo', db('Face_Pull')),
      avanzato: variant('facepull-avv', 'Face pull al cavo, pausa 2"', db('Face_Pull'), '2" di pausa a mani vicino alle orecchie.'),
    },
  },

  // ——— Braccia ———
  {
    id: 'triceps-cable',
    name: 'Tricipiti al cavo',
    muscles: ['tricipiti'],
    equipment: ['cavo'],
    cues: [
      'Puleggia in alto',
      'Gomiti fermi lungo i fianchi',
      'Estendi completamente, risali in 2"',
    ],
    variants: {
      base: variant('pushdown-barra', 'Pushdown al cavo', db('Triceps_Pushdown')),
      intermedio: variant('pushdown-corda', 'Pushdown con corda', db('Triceps_Pushdown_-_Rope_Attachment'), 'In fondo separa le estremità della corda.'),
      avanzato: variant('overhead-cavo', 'Estensioni sopra la testa al cavo', db('Cable_Rope_Overhead_Triceps_Extension'), 'Dai la schiena alla macchina, corda dietro la testa.'),
    },
  },
  {
    id: 'db-curl',
    name: 'Curl manubri',
    muscles: ['bicipiti'],
    equipment: ['manubri', 'panca'],
    cues: [
      'Gomiti fermi, non portarli avanti',
      'Ruota il palmo verso l’alto mentre sali',
      'Scendi in 3" fino a braccio teso',
    ],
    variants: {
      base: variant('curl-alternato', 'Curl alternato manubri', db('Dumbbell_Alternate_Bicep_Curl')),
      intermedio: variant('curl-manubri', 'Curl manubri', db('Dumbbell_Bicep_Curl')),
      avanzato: variant('curl-inclinato', 'Curl su panca inclinata', db('Incline_Dumbbell_Curl'), 'Schienale a 45-60°, braccia che pendono dietro il busto.'),
    },
  },
  {
    id: 'hammer-curl',
    name: 'Curl a martello',
    muscles: ['bicipiti'],
    equipment: ['manubri', 'cavo'],
    cues: [
      'Palmi rivolti uno verso l’altro',
      'Gomiti vicini al busto',
      'Niente slancio con la schiena',
    ],
    variants: {
      base: variant('hammer-base', 'Curl a martello manubri', db('Hammer_Curls')),
      intermedio: variant('hammer-int', 'Curl a martello manubri', db('Hammer_Curls')),
      avanzato: variant('hammer-cavo', 'Curl a martello al cavo con corda', db('Cable_Hammer_Curls_-_Rope_Attachment'), 'Puleggia in basso.'),
    },
  },

  // ——— Dorso ———
  {
    id: 'cable-lat-pulldown',
    name: 'Lat pulldown al cavo',
    muscles: ['dorso', 'bicipiti'],
    equipment: ['cavo'],
    cues: [
      'Puleggia in alto, in ginocchio davanti alla macchina',
      'Tira il gomito verso il fianco',
      'Petto in fuori, spalla bassa',
    ],
    variants: {
      base: variant('pulldown-base', 'Lat pulldown a un braccio al cavo', db('One_Arm_Lat_Pulldown'), 'In ginocchio, una maniglia. Fai tutte le ripetizioni con un braccio, poi l’altro.'),
      intermedio: variant('pulldown-int', 'Lat pulldown a un braccio al cavo', db('One_Arm_Lat_Pulldown'), 'In ginocchio, una maniglia.'),
      avanzato: variant('pulldown-avv', 'Lat pulldown a un braccio, pausa 1"', db('One_Arm_Lat_Pulldown'), '1" di pausa col gomito al fianco.'),
    },
  },
  {
    id: 'barbell-row',
    name: 'Rematore con bilanciere',
    muscles: ['dorso', 'bicipiti', 'lombari'],
    equipment: ['bilanciere', 'smith'],
    cues: [
      'Busto a 45°, schiena neutra',
      'Tira il bilanciere verso l’ombelico',
      'Scendi controllato, senza perdere la posizione',
    ],
    variants: {
      base: variant('row-smith', 'Rematore al Smith', db('Smith_Machine_Bent_Over_Row')),
      intermedio: variant('row-bilanciere', 'Rematore bilanciere', db('Bent_Over_Barbell_Row')),
      avanzato: variant('row-pausa', 'Rematore bilanciere, pausa 1"', db('Bent_Over_Barbell_Row'), '1" di pausa con il bilanciere all’addome.'),
    },
  },
  {
    id: 'db-row',
    name: 'Rematore manubri',
    muscles: ['dorso', 'bicipiti'],
    equipment: ['manubri', 'panca'],
    cues: [
      'Schiena piatta, appoggio stabile sulla panca',
      'Tira il gomito verso l’anca, non verso l’alto',
      'Allunga bene in basso',
    ],
    variants: {
      base: variant('dbrow-petto', 'Rematore manubri su panca inclinata', db('Dumbbell_Incline_Row'), 'Petto appoggiato sullo schienale a 30-45°.'),
      intermedio: variant('dbrow-unbraccio', 'Rematore a un braccio', db('One-Arm_Dumbbell_Row'), 'Ginocchio e mano sulla panca.'),
      avanzato: variant('dbrow-tempo', 'Rematore a un braccio, discesa 3"', db('One-Arm_Dumbbell_Row'), 'Manubri pesanti: 22-26 kg.'),
    },
  },
  {
    id: 'cable-row',
    name: 'Rematore al cavo',
    muscles: ['dorso', 'bicipiti'],
    equipment: ['cavo'],
    cues: [
      'Puleggia in basso, maniglia singola',
      'Busto fermo, tira il gomito indietro',
      'Lascia allungare la scapola in avanti',
    ],
    variants: {
      base: variant('cablerow-base', 'Rematore al cavo a un braccio', db('Seated_One-arm_Cable_Pulley_Rows')),
      intermedio: variant('cablerow-int', 'Rematore al cavo a un braccio', db('Seated_One-arm_Cable_Pulley_Rows')),
      avanzato: variant('cablerow-avv', 'Rematore al cavo, pausa 2"', db('Seated_One-arm_Cable_Pulley_Rows'), '2" di pausa a scapola chiusa.'),
    },
  },

  // ——— Gambe ———
  {
    id: 'back-squat',
    name: 'Squat',
    muscles: ['quadricipiti', 'glutei', 'adduttori'],
    equipment: ['bilanciere', 'smith'],
    cues: [
      'Braccetti di sicurezza appena sotto la tua profondità',
      'Ginocchia nella direzione delle punte',
      'Scendi almeno con le anche all’altezza delle ginocchia',
    ],
    variants: {
      base: variant('squat-smith', 'Squat al Smith', db('Smith_Machine_Squat'), 'Piedi leggermente avanti rispetto al bilanciere.'),
      intermedio: variant('squat-bilanciere', 'Back squat bilanciere', db('Barbell_Squat')),
      avanzato: variant('squat-fermo', 'Back squat con fermo 2"', db('Barbell_Squat'), '2" di pausa in basso, poi sali.'),
    },
  },
  {
    id: 'rdl',
    name: 'Stacco rumeno',
    muscles: ['femorali', 'glutei', 'lombari'],
    equipment: ['manubri', 'bilanciere'],
    cues: [
      'Ginocchia leggermente piegate e ferme',
      'Spingi le anche indietro, peso vicino alle gambe',
      'Scendi finché la schiena resta neutra',
    ],
    variants: {
      base: variant('rdl-manubri', 'Stacco rumeno manubri', db('Stiff-Legged_Dumbbell_Deadlift')),
      intermedio: variant('rdl-bilanciere', 'Stacco rumeno bilanciere', db('Romanian_Deadlift')),
      avanzato: variant('rdl-deficit', 'Stacco rumeno in deficit', db('Romanian_Deadlift_from_Deficit'), 'In piedi su un disco: più allungamento dei femorali.'),
    },
  },
  {
    id: 'deadlift',
    name: 'Stacco da terra',
    muscles: ['glutei', 'femorali', 'lombari', 'dorso'],
    equipment: ['bilanciere'],
    cues: [
      'Bilanciere sopra metà piede, tibie vicine',
      'Petto alto, schiena neutra prima di tirare',
      'Spingi il pavimento, anche e spalle salgono insieme',
    ],
    variants: {
      base: variant('rackpull', 'Stacco dai braccetti (rack pull)', db('Rack_Pulls'), 'Bilanciere sui braccetti del rack appena sotto il ginocchio.'),
      intermedio: variant('deadlift-std', 'Stacco da terra bilanciere', db('Barbell_Deadlift')),
      avanzato: variant('deadlift-deficit', 'Stacco in deficit', db('Deficit_Deadlift'), 'In piedi su un disco da 2-5 cm.'),
    },
  },
  {
    id: 'split-squat',
    name: 'Split squat',
    muscles: ['quadricipiti', 'glutei'],
    equipment: ['manubri', 'smith', 'panca'],
    cues: [
      'Busto dritto, peso sulla gamba davanti',
      'Ginocchio dietro scende verso terra',
      'Spingi col tallone davanti',
    ],
    variants: {
      base: variant('split-manubri', 'Split squat manubri', db('Split_Squat_with_Dumbbells')),
      intermedio: variant('bulgaro-smith', 'Squat bulgaro al Smith', db('Smith_Single-Leg_Split_Squat'), 'Piede dietro sulla panca.'),
      avanzato: variant('bulgaro-manubri', 'Squat bulgaro manubri', db('Split_Squat_with_Dumbbells'), 'Piede dietro sulla panca, un manubrio per mano.'),
    },
  },
  {
    id: 'db-lunge',
    name: 'Affondi manubri',
    muscles: ['quadricipiti', 'glutei'],
    equipment: ['manubri'],
    cues: [
      'Passo lungo, busto dritto',
      'Ginocchio dietro sfiora terra',
      'Spingi col tallone della gamba davanti',
    ],
    variants: {
      base: variant('lunge-indietro', 'Affondi indietro manubri', db('Dumbbell_Rear_Lunge')),
      intermedio: variant('lunge-avanti', 'Affondi in avanti manubri', db('Dumbbell_Lunges')),
      avanzato: variant('lunge-deficit', 'Affondi indietro in deficit', db('Elevated_Back_Lunge'), 'Piede d’appoggio su un disco.'),
    },
  },
  {
    id: 'leg-extension',
    name: 'Leg extension',
    muscles: ['quadricipiti'],
    equipment: ['macchina'],
    cues: [
      'Ginocchio allineato al perno della macchina',
      'Rullo sopra la caviglia',
      'Estendi completamente, scendi in 2-3"',
    ],
    variants: {
      base: variant('legext-base', 'Leg extension', db('Leg_Extensions')),
      intermedio: variant('legext-int', 'Leg extension', db('Leg_Extensions'), '1" di pausa a gamba tesa.'),
      avanzato: variant('legext-singola', 'Leg extension a una gamba', db('Single-Leg_Leg_Extension')),
    },
  },
  {
    id: 'leg-curl',
    name: 'Leg curl',
    muscles: ['femorali'],
    equipment: ['macchina'],
    cues: [
      'Stessa macchina della leg extension: sposta il rullo sotto i polpacci',
      'Blocca le cosce col cuscinetto',
      'Piega fino in fondo, risali in 3"',
    ],
    variants: {
      base: variant('legcurl-base', 'Leg curl da seduto', db('Seated_Leg_Curl')),
      intermedio: variant('legcurl-int', 'Leg curl da seduto', db('Seated_Leg_Curl')),
      avanzato: variant('legcurl-avv', 'Leg curl, discesa 4"', db('Seated_Leg_Curl'), 'Discesa in 4". Ultima serie con drop set.'),
    },
  },
  {
    id: 'hip-thrust',
    name: 'Hip thrust',
    muscles: ['glutei', 'femorali'],
    equipment: ['bilanciere', 'panca'],
    cues: [
      'Scapole sul bordo della panca, tibie verticali in alto',
      'Mento verso il petto, bacino retroverso',
      'Stringi i glutei in alto senza inarcare la schiena',
    ],
    variants: {
      base: variant('bridge-bilanciere', 'Glute bridge con bilanciere', db('Barbell_Glute_Bridge'), 'Da terra, senza panca. Metti un tappetino sotto il bilanciere.'),
      intermedio: variant('hipthrust', 'Hip thrust bilanciere', db('Barbell_Hip_Thrust')),
      avanzato: variant('hipthrust-pausa', 'Hip thrust, pausa 2"', db('Barbell_Hip_Thrust'), '2" di pausa in alto.'),
    },
  },
  {
    id: 'pull-through',
    name: 'Pull-through al cavo',
    muscles: ['glutei', 'femorali'],
    equipment: ['cavo'],
    cues: [
      'Puleggia in basso, corda tra le gambe, schiena alla macchina',
      'Spingi le anche indietro come nello stacco',
      'Torna su stringendo i glutei',
    ],
    variants: {
      base: variant('pullthrough-base', 'Pull-through al cavo', db('Pull_Through')),
      intermedio: variant('pullthrough-int', 'Pull-through al cavo', db('Pull_Through')),
      avanzato: variant('pullthrough-avv', 'Pull-through, pausa 2"', db('Pull_Through'), '2" di pausa in alto.'),
    },
  },
  {
    id: 'gym-calf',
    name: 'Calf raise',
    muscles: ['polpacci'],
    equipment: ['manubri', 'smith'],
    cues: [
      'Avampiede su un disco o un rialzo',
      'Scendi a tallone basso, 1" di pausa',
      'Sali più in alto che puoi',
    ],
    variants: {
      base: variant('calf-manubri', 'Calf raise con manubri', db('Standing_Dumbbell_Calf_Raise')),
      intermedio: variant('calf-smith', 'Calf raise al Smith', db('Smith_Machine_Calf_Raise')),
      avanzato: variant('calf-smith-pausa', 'Calf raise al Smith, pausa 2"', db('Smith_Machine_Calf_Raise'), '2" in basso e 1" in alto.'),
    },
  },

  // ——— Core ———
  {
    id: 'cable-crunch',
    name: 'Crunch al cavo',
    muscles: ['core'],
    equipment: ['cavo'],
    cues: [
      'Puleggia in alto, corda dietro la testa, in ginocchio',
      'Arrotola la schiena portando i gomiti verso le cosce',
      'Il bacino resta fermo',
    ],
    variants: {
      base: variant('cablecrunch-base', 'Crunch al cavo', db('Cable_Crunch')),
      intermedio: variant('cablecrunch-int', 'Crunch al cavo', db('Cable_Crunch')),
      avanzato: variant('cablecrunch-avv', 'Crunch al cavo, pausa 2"', db('Cable_Crunch'), '2" di pausa in basso.'),
    },
  },
  {
    id: 'pallof',
    name: 'Anti-rotazione al cavo',
    muscles: ['core'],
    equipment: ['cavo'],
    cues: [
      'Puleggia all’altezza del petto, di fianco alla macchina',
      'Braccia avanti senza farti ruotare',
      'Addome e glutei contratti',
    ],
    variants: {
      base: variant('pallof-base', 'Pallof press', db('Pallof_Press')),
      intermedio: variant('pallof-int', 'Pallof press', db('Pallof_Press'), '2" di tenuta a braccia tese.'),
      avanzato: variant('woodchop', 'Woodchop al cavo', db('Standing_Cable_Wood_Chop'), 'Ruota dalle anche, braccia quasi tese.'),
    },
  },
];
