import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEVEL_LABEL } from '../models/exercise.model';
import { ProgramService } from '../services/program.service';

interface HistoryRow {
  exercise: string;
  session: string;
  level: string;
  sets: string;
}

interface HistoryGroup {
  date: string;
  label: string;
  rows: HistoryRow[];
}

const formatDate = (iso: string): string => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

@Component({
  selector: 'app-history',
  imports: [RouterLink],
  template: `
    <div class="flex flex-wrap items-center justify-between gap-4">
      <h1 class="text-2xl font-semibold tracking-tight">Storico</h1>
      @if (groups().length) {
        <button
          type="button"
          class="border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          (click)="clear()"
        >
          Cancella storico
        </button>
      }
    </div>

    @if (groups().length) {
      <section class="mt-6 grid grid-cols-3 gap-4">
        @for (stat of summary(); track stat.label) {
          <div class="border border-slate-200 bg-white p-4">
            <p class="text-xs text-slate-500">{{ stat.label }}</p>
            <p class="mt-1 text-2xl font-semibold tabular-nums">{{ stat.value }}</p>
          </div>
        }
      </section>

      <div class="mt-6 flex flex-col gap-6">
        @for (group of groups(); track group.date) {
          <section class="border border-slate-200 bg-white">
            <h2 class="border-b border-slate-200 p-4 text-sm font-semibold capitalize">
              {{ group.label }}
            </h2>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead class="text-xs uppercase text-slate-500">
                  <tr>
                    <th class="p-4 font-normal">Esercizio</th>
                    <th class="p-4 font-normal">Seduta</th>
                    <th class="p-4 font-normal">Livello</th>
                    <th class="p-4 font-normal">Serie</th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of group.rows; track $index) {
                    <tr class="border-t border-slate-200">
                      <td class="p-4">{{ row.exercise }}</td>
                      <td class="p-4 text-slate-600">{{ row.session }}</td>
                      <td class="p-4 text-slate-600">{{ row.level }}</td>
                      <td class="p-4 tabular-nums">{{ row.sets }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </section>
        }
      </div>
    } @else {
      <div class="mt-6 border border-slate-200 bg-white p-6 text-sm text-slate-600">
        <p>Nessuna serie registrata.</p>
        <a routerLink="/" class="mt-4 inline-block text-indigo-600 hover:underline">
          Vai alla settimana
        </a>
      </div>
    }
  `,
})
export class History {
  private readonly service = inject(ProgramService);

  protected readonly groups = computed<HistoryGroup[]>(() => {
    const byDate = new Map<string, HistoryRow[]>();
    for (const log of this.service.logs()) {
      const rows = byDate.get(log.date) ?? [];
      rows.push({
        exercise: this.service.exercise(log.exerciseId)?.variants[log.level].name ?? log.exerciseId,
        session: this.service.session(log.sessionId)?.title ?? log.sessionId,
        level: LEVEL_LABEL[log.level],
        sets: log.setsCompleted.join(' · '),
      });
      byDate.set(log.date, rows);
    }
    return [...byDate.entries()]
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, rows]) => ({ date, label: formatDate(date), rows }));
  });

  protected readonly summary = computed(() => [
    { label: 'Giorni registrati', value: this.groups().length },
    { label: 'Esercizi registrati', value: this.service.logs().length },
    { label: 'Serie registrate', value: this.service.loggedSets() },
  ]);

  protected clear(): void {
    if (confirm('Cancellare tutto lo storico?')) this.service.clearLogs();
  }
}
