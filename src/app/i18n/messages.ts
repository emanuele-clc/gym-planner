import { Equipment, Level, MuscleGroup } from '../models/exercise.model';
import { Weekday } from '../models/program.model';

export interface GuideSection {
  title: string;
  items: string[];
}

type PlaceKey = 'palestra' | 'casa';

const it = {
  locale: 'it-IT',
  langName: 'Italiano',
  appTitle: { palestra: 'Scheda palestra', casa: 'Scheda corpo libero' } as Record<
    PlaceKey,
    string
  >,
  nav: { week: 'Settimana', history: 'Storico', guide: 'Guida' },
  themeLight: 'Chiaro',
  themeDark: 'Scuro',
  languageAria: 'Lingua',
  footerImages: 'Immagini',
  footerCode: 'Codice su GitHub',

  levels: { base: 'Base', intermedio: 'Intermedio', avanzato: 'Avanzato' } as Record<Level, string>,
  levelsShort: { base: 'Base', intermedio: 'Interm.', avanzato: 'Avanz.' } as Record<Level, string>,
  levelAuto: 'Auto',
  weekdays: {
    lun: 'Lunedì',
    mar: 'Martedì',
    mer: 'Mercoledì',
    gio: 'Giovedì',
    ven: 'Venerdì',
    sab: 'Sabato',
    dom: 'Domenica',
  } as Record<Weekday, string>,
  muscles: {
    petto: 'petto',
    spalle: 'spalle',
    tricipiti: 'tricipiti',
    dorso: 'dorso',
    bicipiti: 'bicipiti',
    quadricipiti: 'quadricipiti',
    femorali: 'femorali',
    glutei: 'glutei',
    polpacci: 'polpacci',
    adduttori: 'adduttori',
    lombari: 'lombari',
    core: 'core',
  } as Record<MuscleGroup, string>,
  equipment: {
    nessuno: 'nessuno',
    sbarra: 'sbarra',
    parallele: 'parallele',
    sedia: 'sedia',
    tavolo: 'tavolo',
    zaino: 'zaino',
    elastici: 'elastici',
    bilanciere: 'bilanciere',
    manubri: 'manubri',
    panca: 'panca',
    smith: 'smith',
    cavo: 'cavo',
    macchina: 'macchina',
  } as Record<Equipment, string>,

  switches: {
    placeAria: 'Dove ti alleni',
    gym: 'Palestra',
    home: 'Corpo libero',
    levelAria: 'Livello',
    barAria: 'Sbarra',
    withBar: 'Con sbarra',
    noBar: 'Senza sbarra',
    bandsAria: 'Elastici',
    noBands: 'Senza elastici',
    withBands: 'Con elastici',
  },

  swap: {
    backTo: (name: string) => `Torna a ${name}`,
    barTaken: (name: string) => `Sbarra occupata: ${name}`,
    noBar: (name: string) => `Senza sbarra: ${name}`,
  },

  card: {
    doneToday: 'Fatto oggi',
    alternative: (inGym: boolean, replaces: string) =>
      `Alternativa ${inGym ? 'alla sbarra' : 'senza sbarra'} · al posto di ${replaces}`,
    level: 'Livello',
    levelAria: 'Livello esercizio',
    sets: 'Serie',
    reps: 'Rip.',
    seconds: 'Secondi',
    rest: 'Recupero',
    lastSaved: (date: string, sets: string) => `Ultimo salvataggio (${date}): ${sets}`,
  },
  tracker: { setPrefix: 'S', save: 'Salva', saved: 'Salvato' },
  timer: { rest: 'Riposo', start: 'Avvia', stop: 'Stop' },
  media: { missing: 'Media mancante' },

  common: {
    exercises: 'Esercizi',
    sets: 'Serie',
    level: 'Livello',
    equipment: 'Attrezzatura',
    equipmentList: (list: string) => `Attrezzatura: ${list}`,
    none: 'nessuna',
    rest: 'Riposo',
    done: 'Fatto',
  },

  list: {
    today: 'Oggi',
    duration: 'Durata',
    musclesList: (list: string) => `Muscoli: ${list}`,
    openSession: 'Apri seduta',
    nextSession: (day: string, title: string) => `Prossima seduta: ${day} · ${title}`,
    currentLevel: 'Livello attuale',
    planGym: 'Piano: palestra',
    planHome: (noBar: boolean) => `Piano: corpo libero · ${noBar ? 'senza sbarra' : 'con sbarra'}`,
    week: 'Settimana',
    summary: (exercises: number, sets: number, minutes: number) =>
      `${exercises} esercizi · ${sets} serie · ${minutes} min`,
    loggedThisWeek: (done: number, total: number) => `${done}/${total} registrati questa settimana`,
    totals: {
      sessions: 'Sedute a settimana',
      sets: 'Serie a settimana',
      exercises: 'Esercizi in scheda',
      logged: 'Serie registrate',
    },
    levelDescription: {
      palestra: {
        base: 'Smith machine, macchine e manubri: movimenti guidati per imparare la tecnica. 10-12 ripetizioni.',
        intermedio:
          'Bilanciere e manubri liberi: panca, squat, stacco, rematore. 6-12 ripetizioni.',
        avanzato:
          'Più serie e carichi più alti: fermi, deficit, discese lente. 5-8 ripetizioni sui multiarticolari.',
      },
      casa: {
        base: 'Varianti facili: negative, inclinate, con appoggio o elastico. Meno ripetizioni, più recupero.',
        intermedio:
          'Movimenti standard: dip alle parallele, trazioni, squat bulgaro, push-up declinati.',
        avanzato:
          'Varianti difficili: zaino con peso, monogamba, pliometria, push-up a un braccio.',
      },
    } as Record<PlaceKey, Record<Level, string>>,
  },

  detail: {
    estimatedDuration: 'Durata stimata',
    loggedThisWeek: (done: number, total: number) =>
      `${done} di ${total} esercizi registrati questa settimana`,
    gymEquipment:
      'Rack con Smith e sbarra, bilanciere, manubri, panca regolabile, cavo regolabile, pectoral / reverse fly, leg extension / leg curl, chest press.',
    gymBarTaken: 'Se la sbarra è occupata, usa il pulsante nella card per passare al cavo.',
    homeBar:
      'Ogni esercizio alla sbarra ha un’alternativa senza sbarra. Cambia tutta la seduta qui, oppure un esercizio alla volta dal pulsante nella card.',
    homeBands:
      'Con gli elastici la seduta aggiunge esercizi per spalle, braccia e gambe e usa alternative più efficaci.',
    warmup: 'Riscaldamento · 8 min',
    notFound: 'Seduta non trovata.',
  },

  history: {
    title: 'Storico',
    clear: 'Cancella storico',
    confirmClear: 'Cancellare tutto lo storico?',
    days: 'Giorni registrati',
    exercises: 'Esercizi registrati',
    sets: 'Serie registrate',
    colExercise: 'Esercizio',
    colSession: 'Seduta',
    colLevel: 'Livello',
    colSets: 'Serie',
    empty: 'Nessuna serie registrata.',
    goToWeek: 'Vai alla settimana',
  },

  guide: {
    title: 'Guida',
    volumeTitle: 'Serie dirette a settimana per muscolo',
    volumeNote: (level: string) =>
      `Livello ${level}. Conteggio per muscolo principale dell’esercizio. Riferimento per crescere: 10-20 serie a settimana.`,
    days: 'gg',
    gym: [
      {
        title: 'Progressione dei carichi',
        items: [
          'Registra ogni seduta: senza numeri non c’è progressione.',
          'Doppia progressione: quando fai il massimo delle ripetizioni su tutte le serie, aumenta il carico (2,5 kg sul bilanciere, il manubrio successivo, una piastra in più al pacco pesi) e riparti dal minimo.',
          'Se non raggiungi il minimo delle ripetizioni, togli peso: non peggiorare la tecnica.',
          'Il livello si cambia anche per singolo esercizio: puoi tenere lo squat al Smith (Base) e il resto su Intermedio.',
        ],
      },
      {
        title: 'Sicurezza nel rack',
        items: [
          'Squat e panca col bilanciere: imposta sempre i braccetti di sicurezza appena sotto il punto più basso del movimento.',
          'Il Smith ha i fermi di sicurezza: ruota il bilanciere per agganciarlo in qualsiasi punto.',
          'Usa le clip sui dischi. Rimetti manubri e dischi a posto.',
          'Sulle macchine regola sedile e leve prima della prima serie: il perno della macchina va allineato all’articolazione.',
        ],
      },
      {
        title: 'Esecuzione',
        items: [
          'Tempo: 1" in spinta, 2-3" in discesa, nessun rimbalzo.',
          'Lascia 1-3 ripetizioni di riserva sui multiarticolari pesanti; vai vicino al cedimento su macchine e cavo.',
          'Rispetta i recuperi indicati: 2-3 minuti sui multiarticolari, 60-75" sull’isolamento.',
        ],
      },
      {
        title: 'Cardio',
        items: [
          'Riscaldamento: 5 minuti di cyclette, ellittica o tapis roulant prima di ogni seduta.',
          'Per il cuore: 2-3 volte a settimana 20-30 minuti a un ritmo in cui riesci ancora a parlare, a fine seduta o nei giorni di riposo.',
          'Prima delle sedute di gambe evita il cardio intenso: toglie forza a squat e stacco.',
        ],
      },
    ] as GuideSection[],
    home: [
      {
        title: 'Progressione',
        items: [
          'Registra ogni seduta: senza numeri non c’è progressione.',
          'Quando fai il massimo delle ripetizioni su tutte le serie, passa alla variante successiva o aggiungi uno zaino con peso.',
          'Se non raggiungi il minimo delle ripetizioni, scendi di livello su quell’esercizio.',
        ],
      },
      {
        title: 'Esecuzione',
        items: [
          'Tempo: 1" in salita, 3" in discesa, nessun rimbalzo.',
          'Lascia 1-2 ripetizioni di riserva nelle prime serie; vai vicino al cedimento nell’ultima.',
          'Rispetta i recuperi indicati: i recuperi troppo corti riducono le ripetizioni delle serie successive.',
        ],
      },
      {
        title: 'Senza sbarra e trazioni',
        items: [
          'Con "Senza sbarra" ogni esercizio alla sbarra viene sostituito da un’alternativa: row sotto tavolo, row e curl con zaino, pullover, alzate posteriori. Vale per tutta la seduta o, dal pulsante nella card, per un esercizio alla volta.',
          'Il livello si può cambiare per ogni singolo esercizio dalla card: tieni le trazioni su Base e il resto su Intermedio.',
          'Per arrivare alle trazioni: trazioni con elastico, trazioni negative (discesa in 4-5"), scapular pull-up e row sotto tavolo.',
          'Il tavolo per i row deve essere robusto: provalo con il peso prima di iniziare.',
          'Lo zaino va caricato con libri o bottiglie; aumenta il peso quando superi il massimo delle ripetizioni.',
        ],
      },
      {
        title: 'Elastici',
        items: [
          'Attiva "Con elastici": ogni seduta aggiunge 2-3 esercizi e le alternative senza sbarra usano l’elastico.',
          'Scegli la resistenza in modo da arrivare vicino al cedimento tra 10 e 15 ripetizioni; passa a un elastico più forte quando superi le 15.',
          'Ancora l’elastico a un punto fisso (porta con ancoraggio, palo, maniglia robusta) e controlla che non sia usurato prima di ogni seduta.',
          'Nelle immagini degli esercizi con elastico spesso compare un cavo: il movimento è lo stesso.',
        ],
      },
    ] as GuideSection[],
    shared: [
      {
        title: 'Recupero',
        items: [
          'Ogni gruppo muscolare è allenato 2 volte a settimana, con almeno 48 ore tra le sedute.',
          'Ogni 6-8 settimane fai una settimana di scarico: metà delle serie e carichi ridotti del 10-20%.',
          'Dormi 7-8 ore per notte.',
          'Dolore alle articolazioni: sostituisci l’esercizio con una variante più facile.',
        ],
      },
      {
        title: 'Alimentazione',
        items: [
          'Proteine: 1,6-2,2 g per kg di peso corporeo al giorno.',
          'Per aumentare la massa serve un leggero surplus calorico, circa 200-300 kcal sopra il mantenimento.',
          'In deficit calorico la crescita muscolare è molto più lenta.',
        ],
      },
    ] as GuideSection[],
  },
};

export type Messages = typeof it;

const en: Messages = {
  locale: 'en-GB',
  langName: 'English',
  appTitle: { palestra: 'Gym plan', casa: 'Bodyweight plan' },
  nav: { week: 'Week', history: 'History', guide: 'Guide' },
  themeLight: 'Light',
  themeDark: 'Dark',
  languageAria: 'Language',
  footerImages: 'Images',
  footerCode: 'Code on GitHub',

  levels: { base: 'Beginner', intermedio: 'Intermediate', avanzato: 'Advanced' },
  levelsShort: { base: 'Beg.', intermedio: 'Inter.', avanzato: 'Adv.' },
  levelAuto: 'Auto',
  weekdays: {
    lun: 'Monday',
    mar: 'Tuesday',
    mer: 'Wednesday',
    gio: 'Thursday',
    ven: 'Friday',
    sab: 'Saturday',
    dom: 'Sunday',
  },
  muscles: {
    petto: 'chest',
    spalle: 'shoulders',
    tricipiti: 'triceps',
    dorso: 'back',
    bicipiti: 'biceps',
    quadricipiti: 'quads',
    femorali: 'hamstrings',
    glutei: 'glutes',
    polpacci: 'calves',
    adduttori: 'adductors',
    lombari: 'lower back',
    core: 'core',
  },
  equipment: {
    nessuno: 'none',
    sbarra: 'pull-up bar',
    parallele: 'parallel bars',
    sedia: 'chair',
    tavolo: 'table',
    zaino: 'backpack',
    elastici: 'bands',
    bilanciere: 'barbell',
    manubri: 'dumbbells',
    panca: 'bench',
    smith: 'smith',
    cavo: 'cable',
    macchina: 'machine',
  },

  switches: {
    placeAria: 'Where you train',
    gym: 'Gym',
    home: 'Bodyweight',
    levelAria: 'Level',
    barAria: 'Pull-up bar',
    withBar: 'With bar',
    noBar: 'No bar',
    bandsAria: 'Bands',
    noBands: 'No bands',
    withBands: 'With bands',
  },

  swap: {
    backTo: (name) => `Back to ${name}`,
    barTaken: (name) => `Bar taken: ${name}`,
    noBar: (name) => `No bar: ${name}`,
  },

  card: {
    doneToday: 'Done today',
    alternative: (inGym, replaces) =>
      `${inGym ? 'Pull-up bar alternative' : 'No-bar alternative'} · replaces ${replaces}`,
    level: 'Level',
    levelAria: 'Exercise level',
    sets: 'Sets',
    reps: 'Reps',
    seconds: 'Seconds',
    rest: 'Rest',
    lastSaved: (date, sets) => `Last saved (${date}): ${sets}`,
  },
  tracker: { setPrefix: 'S', save: 'Save', saved: 'Saved' },
  timer: { rest: 'Rest', start: 'Start', stop: 'Stop' },
  media: { missing: 'Missing media' },

  common: {
    exercises: 'Exercises',
    sets: 'Sets',
    level: 'Level',
    equipment: 'Equipment',
    equipmentList: (list) => `Equipment: ${list}`,
    none: 'none',
    rest: 'Rest day',
    done: 'Done',
  },

  list: {
    today: 'Today',
    duration: 'Duration',
    musclesList: (list) => `Muscles: ${list}`,
    openSession: 'Open session',
    nextSession: (day, title) => `Next session: ${day} · ${title}`,
    currentLevel: 'Current level',
    planGym: 'Plan: gym',
    planHome: (noBar) => `Plan: bodyweight · ${noBar ? 'no bar' : 'with bar'}`,
    week: 'Week',
    summary: (exercises, sets, minutes) => `${exercises} exercises · ${sets} sets · ${minutes} min`,
    loggedThisWeek: (done, total) => `${done}/${total} logged this week`,
    totals: {
      sessions: 'Sessions per week',
      sets: 'Sets per week',
      exercises: 'Exercises in plan',
      logged: 'Sets logged',
    },
    levelDescription: {
      palestra: {
        base: 'Smith machine, machines and dumbbells: guided movements to learn technique. 10-12 reps.',
        intermedio: 'Barbell and free dumbbells: bench, squat, deadlift, row. 6-12 reps.',
        avanzato:
          'More sets and heavier loads: pauses, deficits, slow eccentrics. 5-8 reps on compound lifts.',
      },
      casa: {
        base: 'Easy variations: negatives, inclines, assisted or with a band. Fewer reps, more rest.',
        intermedio:
          'Standard movements: parallel bar dips, pull-ups, Bulgarian split squats, decline push-ups.',
        avanzato: 'Hard variations: weighted backpack, single-leg, plyometrics, one-arm push-ups.',
      },
    },
  },

  detail: {
    estimatedDuration: 'Estimated time',
    loggedThisWeek: (done, total) => `${done} of ${total} exercises logged this week`,
    gymEquipment:
      'Rack with Smith machine and pull-up bar, barbell, dumbbells, adjustable bench, adjustable cable, pec deck / reverse fly, leg extension / leg curl, chest press.',
    gymBarTaken: 'If the pull-up bar is taken, use the button on the card to switch to the cable.',
    homeBar:
      'Every pull-up bar exercise has a no-bar alternative. Switch the whole session here, or one exercise at a time from the button on the card.',
    homeBands:
      'With bands the session adds exercises for shoulders, arms and legs and uses more effective alternatives.',
    warmup: 'Warm-up · 8 min',
    notFound: 'Session not found.',
  },

  history: {
    title: 'History',
    clear: 'Clear history',
    confirmClear: 'Delete the whole history?',
    days: 'Days logged',
    exercises: 'Exercises logged',
    sets: 'Sets logged',
    colExercise: 'Exercise',
    colSession: 'Session',
    colLevel: 'Level',
    colSets: 'Sets',
    empty: 'No sets logged yet.',
    goToWeek: 'Go to the week',
  },

  guide: {
    title: 'Guide',
    volumeTitle: 'Direct sets per week per muscle',
    volumeNote: (level) =>
      `${level} level. Counted on the exercise’s main muscle. Growth target: 10-20 sets per week.`,
    days: 'd',
    gym: [
      {
        title: 'Load progression',
        items: [
          'Log every session: without numbers there is no progression.',
          'Double progression: when you hit the top of the rep range on every set, increase the load (2.5 kg on the barbell, the next dumbbell, one more plate on the stack) and start again from the bottom of the range.',
          'If you can’t reach the minimum reps, take weight off: don’t let your form slip.',
          'You can also change the level for a single exercise: keep the squat on the Smith (Beginner) and the rest on Intermediate.',
        ],
      },
      {
        title: 'Rack safety',
        items: [
          'Barbell squat and bench: always set the safety arms just below the lowest point of the movement.',
          'The Smith machine has safety catches: rotate the bar to hook it at any point.',
          'Use collars on the plates. Put dumbbells and plates back.',
          'On machines, adjust seat and levers before the first set: the machine pivot should line up with the joint.',
        ],
      },
      {
        title: 'Technique',
        items: [
          'Tempo: 1" up, 2-3" down, no bouncing.',
          'Leave 1-3 reps in reserve on heavy compound lifts; go close to failure on machines and cables.',
          'Stick to the rest times: 2-3 minutes on compound lifts, 60-75" on isolation.',
        ],
      },
      {
        title: 'Cardio',
        items: [
          'Warm-up: 5 minutes on the bike, elliptical or treadmill before every session.',
          'For heart health: 2-3 times a week, 20-30 minutes at a pace where you can still talk, after the session or on rest days.',
          'Avoid hard cardio before leg days: it saps strength from squats and deadlifts.',
        ],
      },
    ],
    home: [
      {
        title: 'Progression',
        items: [
          'Log every session: without numbers there is no progression.',
          'When you hit the top of the rep range on every set, move to the next variation or add a weighted backpack.',
          'If you can’t reach the minimum reps, drop a level on that exercise.',
        ],
      },
      {
        title: 'Technique',
        items: [
          'Tempo: 1" up, 3" down, no bouncing.',
          'Leave 1-2 reps in reserve on the first sets; go close to failure on the last one.',
          'Stick to the rest times: rests that are too short reduce the reps of the following sets.',
        ],
      },
      {
        title: 'No bar and pull-ups',
        items: [
          'With "No bar" every pull-up bar exercise is replaced by an alternative: under-table rows, backpack rows and curls, pullovers, rear delt raises. It applies to the whole session or, from the button on the card, to one exercise at a time.',
          'You can change the level for each exercise from its card: keep pull-ups on Beginner and the rest on Intermediate.',
          'To work up to pull-ups: band-assisted pull-ups, negative pull-ups (4-5" descent), scapular pull-ups and under-table rows.',
          'The table for rows must be sturdy: test it with your weight before you start.',
          'Load the backpack with books or bottles; add weight when you go past the top of the rep range.',
        ],
      },
      {
        title: 'Bands',
        items: [
          'Turn on "With bands": each session adds 2-3 exercises and the no-bar alternatives use the band.',
          'Choose a resistance that takes you close to failure between 10 and 15 reps; move to a stronger band when you go past 15.',
          'Anchor the band to a fixed point (door anchor, pole, sturdy handle) and check it isn’t worn before every session.',
          'The images for band exercises often show a cable: the movement is the same.',
        ],
      },
    ],
    shared: [
      {
        title: 'Recovery',
        items: [
          'Each muscle group is trained twice a week, with at least 48 hours between sessions.',
          'Every 6-8 weeks take a deload week: half the sets and loads reduced by 10-20%.',
          'Sleep 7-8 hours a night.',
          'Joint pain: replace the exercise with an easier variation.',
        ],
      },
      {
        title: 'Nutrition',
        items: [
          'Protein: 1.6-2.2 g per kg of body weight per day.',
          'To build mass you need a slight calorie surplus, about 200-300 kcal above maintenance.',
          'In a calorie deficit muscle growth is much slower.',
        ],
      },
    ],
  },
};

export const LANGS = ['it', 'en'] as const;

export type Lang = (typeof LANGS)[number];

export const MESSAGES: Record<Lang, Messages> = { it, en };
