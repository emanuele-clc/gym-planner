import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';
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

const formatDate = (iso: string, locale: string): string => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale, {
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
      <h1 class="text-3xl font-bold tracking-tight">{{ t().history.title }}</h1>
      @if (groups().length) {
        <button
          type="button"
          class="border border-line-strong bg-surface px-4 py-2 text-sm text-body hover:bg-subtle"
          (click)="clear()"
        >
          {{ t().history.clear }}
        </button>
      }
    </div>

    @if (groups().length) {
      <section class="mt-6 grid grid-cols-3 gap-4">
        @for (stat of summary(); track stat.label) {
          <div class="rounded border border-line bg-surface p-4">
            <p class="text-xs text-muted">{{ stat.label }}</p>
            <p class="mt-1 text-2xl font-semibold tabular-nums">{{ stat.value }}</p>
          </div>
        }
      </section>

      <div class="mt-6 flex flex-col gap-6">
        @for (group of groups(); track group.date) {
          <section class="rounded border border-line bg-surface">
            <h2 class="border-b border-line p-4 text-sm font-semibold capitalize">
              {{ group.label }}
            </h2>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead class="text-xs uppercase text-muted">
                  <tr>
                    <th class="p-4 font-normal">{{ t().history.colExercise }}</th>
                    <th class="p-4 font-normal">{{ t().history.colSession }}</th>
                    <th class="p-4 font-normal">{{ t().history.colLevel }}</th>
                    <th class="p-4 font-normal">{{ t().history.colSets }}</th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of group.rows; track $index) {
                    <tr class="border-t border-line">
                      <td class="p-4">{{ row.exercise }}</td>
                      <td class="p-4 text-muted">{{ row.session }}</td>
                      <td class="p-4 text-muted">{{ row.level }}</td>
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
      <div class="mt-6 rounded border border-line bg-surface p-6 text-sm text-muted">
        <p>{{ t().history.empty }}</p>
        <a routerLink="/" class="mt-4 inline-block text-accent hover:underline">
          {{ t().history.goToWeek }}
        </a>
      </div>
    }
  `,
})
export class History {
  private readonly service = inject(ProgramService);

  protected readonly t = inject(I18nService).t;

  protected readonly groups = computed<HistoryGroup[]>(() => {
    const t = this.t();
    const byDate = new Map<string, HistoryRow[]>();
    for (const log of this.service.logs()) {
      const rows = byDate.get(log.date) ?? [];
      rows.push({
        exercise: this.service.exercise(log.exerciseId)?.variants[log.level].name ?? log.exerciseId,
        session: this.service.session(log.sessionId)?.title ?? log.sessionId,
        level: t.levels[log.level],
        sets: log.setsCompleted.join(' · '),
      });
      byDate.set(log.date, rows);
    }
    return [...byDate.entries()]
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, rows]) => ({ date, label: formatDate(date, t.locale), rows }));
  });

  protected readonly summary = computed(() => [
    { label: this.t().history.days, value: this.groups().length },
    { label: this.t().history.exercises, value: this.service.logs().length },
    { label: this.t().history.sets, value: this.service.loggedSets() },
  ]);

  protected clear(): void {
    if (confirm(this.t().history.confirmClear)) this.service.clearLogs();
  }
}
