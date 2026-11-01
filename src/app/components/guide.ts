import { Component, computed, inject } from '@angular/core';
import { LEVEL_LABEL } from '../models/exercise.model';
import { ProgramService } from '../services/program.service';
import { ProgressBar } from './progress-bar';

interface GuideSection {
  title: string;
  items: string[];
}

const GYM_SECTIONS: GuideSection[] = [
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
];

const HOME_SECTIONS: GuideSection[] = [
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
];

const SHARED_SECTIONS: GuideSection[] = [
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
];

@Component({
  selector: 'app-guide',
  imports: [ProgressBar],
  template: `
    <h1 class="text-3xl font-bold tracking-tight">Guida</h1>

    <section class="mt-6 rounded border border-line bg-surface">
      <div class="p-4">
        <h2 class="text-sm font-semibold">Serie dirette a settimana per muscolo</h2>
        <p class="mt-1 text-xs text-muted">
          Livello {{ levelLabel() }}. Conteggio per muscolo principale dell’esercizio.
          Riferimento per crescere: 10-20 serie a settimana.
        </p>
      </div>
      <ul>
        @for (row of volume(); track row.muscle) {
          <li class="grid grid-cols-[5.5rem_1fr_4.5rem] items-center gap-4 border-t border-line p-4 text-sm">
            <span class="capitalize">{{ row.muscle }}</span>
            <app-progress-bar [value]="row.sets" [max]="20" />
            <span class="text-right tabular-nums text-muted">
              {{ row.sets }} · {{ row.days }} gg
            </span>
          </li>
        }
      </ul>
    </section>

    <div class="mt-6 grid gap-6 md:grid-cols-2">
      @for (section of sections(); track section.title) {
        <section class="rounded border border-line bg-surface p-4">
          <h2 class="text-sm font-semibold">{{ section.title }}</h2>
          <ul class="mt-4 list-disc pl-4 text-sm text-body">
            @for (item of section.items; track item) {
              <li class="mb-2">{{ item }}</li>
            }
          </ul>
        </section>
      }
    </div>
  `,
})
export class Guide {
  private readonly service = inject(ProgramService);

  protected readonly sections = computed(() => [
    ...(this.service.place() === 'palestra' ? GYM_SECTIONS : HOME_SECTIONS),
    ...SHARED_SECTIONS,
  ]);
  protected readonly volume = computed(() => this.service.weeklyVolume());
  protected readonly levelLabel = computed(() => LEVEL_LABEL[this.service.level()]);
}
