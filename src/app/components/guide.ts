import { Component, computed, inject } from '@angular/core';
import { LEVEL_LABEL } from '../models/exercise.model';
import { ProgramService } from '../services/program.service';
import { ProgressBar } from './progress-bar';

interface GuideSection {
  title: string;
  items: string[];
}

const SECTIONS: GuideSection[] = [
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
    title: 'Recupero',
    items: [
      'Ogni gruppo muscolare è allenato 2 volte a settimana, con almeno 48 ore tra le sedute.',
      'Ogni 6-8 settimane fai una settimana di scarico: metà delle serie, stesse varianti.',
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
    <h1 class="text-2xl font-semibold tracking-tight">Guida</h1>

    <section class="mt-6 border border-slate-200 bg-white">
      <div class="p-4">
        <h2 class="text-sm font-semibold">Serie dirette a settimana per muscolo</h2>
        <p class="mt-1 text-xs text-slate-500">
          Livello {{ levelLabel() }}. Conteggio per muscolo principale dell’esercizio.
          Riferimento per crescere: 10-20 serie a settimana.
        </p>
      </div>
      <ul>
        @for (row of volume(); track row.muscle) {
          <li class="grid grid-cols-[5.5rem_1fr_4.5rem] items-center gap-4 border-t border-slate-200 p-4 text-sm">
            <span class="capitalize">{{ row.muscle }}</span>
            <app-progress-bar [value]="row.sets" [max]="20" />
            <span class="text-right tabular-nums text-slate-600">
              {{ row.sets }} · {{ row.days }} gg
            </span>
          </li>
        }
      </ul>
    </section>

    <div class="mt-6 grid gap-6 md:grid-cols-2">
      @for (section of sections; track section.title) {
        <section class="border border-slate-200 bg-white p-4">
          <h2 class="text-sm font-semibold">{{ section.title }}</h2>
          <ul class="mt-4 list-disc pl-4 text-sm text-slate-700">
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

  protected readonly sections = SECTIONS;
  protected readonly volume = computed(() => this.service.weeklyVolume());
  protected readonly levelLabel = computed(() => LEVEL_LABEL[this.service.level()]);
}
