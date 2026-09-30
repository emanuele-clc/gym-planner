import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEVEL_LABEL, Level } from '../models/exercise.model';
import { Session, WEEKDAYS, WEEKDAY_LABEL, Weekday } from '../models/program.model';
import { Progress, ProgramService, SessionStats } from '../services/program.service';
import { ProgressBar } from './progress-bar';

const LEVEL_DESCRIPTION: Record<Level, string> = {
  base: 'Varianti facili: negative, inclinate, con appoggio o elastico. Meno ripetizioni, più recupero.',
  intermedio: 'Movimenti standard: dip alle parallele, trazioni, squat bulgaro, push-up declinati.',
  avanzato: 'Varianti difficili: zaino con peso, monogamba, pliometria, push-up a un braccio.',
};

interface Plan {
  session: Session;
  stats: SessionStats;
  progress: Progress;
}

interface WeekRow {
  day: Weekday;
  label: string;
  isToday: boolean;
  plan: Plan | null;
}

@Component({
  selector: 'app-session-list',
  imports: [RouterLink, ProgressBar],
  template: `
    <div class="flex flex-col gap-6">
      <section class="grid gap-6 lg:grid-cols-3">
        <div class="rounded bg-indigo-600 p-6 text-white md:p-8 lg:col-span-2">
          @if (todayRow(); as t) {
            <p class="text-xs font-medium uppercase tracking-widest text-indigo-200">
              Oggi · {{ t.label }}
            </p>
            @if (t.plan; as p) {
              <h1 class="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                {{ p.session.title }}
              </h1>
              <dl class="mt-8 grid grid-cols-3 gap-4">
                <div>
                  <dt class="text-xs uppercase tracking-wide text-indigo-200">Esercizi</dt>
                  <dd class="mt-1 text-3xl font-bold">{{ p.stats.exercises }}</dd>
                </div>
                <div>
                  <dt class="text-xs uppercase tracking-wide text-indigo-200">Serie</dt>
                  <dd class="mt-1 text-3xl font-bold">{{ p.stats.sets }}</dd>
                </div>
                <div>
                  <dt class="text-xs uppercase tracking-wide text-indigo-200">Durata</dt>
                  <dd class="mt-1 text-3xl font-bold">{{ p.stats.minutes }} min</dd>
                </div>
              </dl>
              <p class="mt-8 text-sm text-indigo-100">Muscoli: {{ p.stats.muscles.join(', ') }}</p>
              <p class="mt-2 text-sm text-indigo-100">
                Attrezzatura: {{ p.stats.equipment.length ? p.stats.equipment.join(', ') : 'nessuna' }}
              </p>
              <a
                class="mt-8 block rounded bg-white px-6 py-4 text-center text-sm font-bold text-indigo-700 hover:bg-indigo-50 sm:inline-block"
                [routerLink]="['/seduta', p.session.id]"
              >
                Apri seduta
              </a>
            } @else {
              <h1 class="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Riposo</h1>
              @if (next(); as n) {
                <p class="mt-6 text-sm text-indigo-100">
                  Prossima seduta: {{ n.label }} · {{ n.plan?.session?.title }}
                </p>
              }
            }
          }
        </div>

        <div class="rounded border border-line border-t-4 border-t-indigo-600 bg-surface p-6">
          <p class="text-xs font-medium uppercase tracking-widest text-muted">Livello attuale</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight">{{ levelLabel() }}</h2>
          <p class="mt-4 text-sm text-body">{{ levelDescription() }}</p>
        </div>
      </section>

      <section class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        @for (stat of totals(); track stat.label) {
          <div class="rounded border border-l-4 border-line border-l-indigo-600 bg-surface p-4">
            <p class="text-xs uppercase tracking-wide text-muted">{{ stat.label }}</p>
            <p class="mt-2 text-3xl font-bold tabular-nums">{{ stat.value }}</p>
          </div>
        }
      </section>

      <section>
        <h2 class="mb-4 text-xs font-medium uppercase tracking-widest text-muted">Settimana</h2>
        <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (row of rows(); track row.day) {
            <li>
              @if (row.plan; as p) {
                <a
                  class="flex h-full flex-col gap-4 rounded border-2 bg-surface p-4 hover:border-accent"
                  [class]="row.isToday ? 'border-accent' : 'border-line'"
                  [routerLink]="['/seduta', p.session.id]"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-xs uppercase tracking-widest text-muted">{{ row.label }}</span>
                    @if (row.isToday) {
                      <span class="rounded bg-indigo-600 px-2 py-1 text-xs font-bold text-white">
                        Oggi
                      </span>
                    }
                  </div>
                  <div>
                    <p class="text-2xl font-bold tracking-tight">{{ p.session.title }}</p>
                    <p class="mt-1 text-sm text-muted">{{ p.stats.muscles.join(', ') }}</p>
                  </div>
                  <p class="mt-auto text-sm text-body">
                    {{ p.stats.exercises }} esercizi · {{ p.stats.sets }} serie · {{ p.stats.minutes }} min
                  </p>
                  <div>
                    <app-progress-bar [value]="p.progress.done" [max]="p.progress.total" />
                    <p class="mt-2 text-xs text-muted">
                      {{ p.progress.done }}/{{ p.progress.total }} registrati questa settimana
                    </p>
                  </div>
                </a>
              } @else {
                <div
                  class="flex h-full flex-col gap-2 rounded border-2 bg-subtle p-4"
                  [class]="row.isToday ? 'border-accent' : 'border-line'"
                >
                  <span class="text-xs uppercase tracking-widest text-muted">{{ row.label }}</span>
                  <p class="text-2xl font-bold tracking-tight text-muted">Riposo</p>
                </div>
              }
            </li>
          }
        </ul>
      </section>
    </div>
  `,
})
export class SessionList {
  private readonly service = inject(ProgramService);
  private readonly todayDay = this.service.todayWeekday();

  protected readonly levelLabel = computed(() => LEVEL_LABEL[this.service.level()]);
  protected readonly levelDescription = computed(() => LEVEL_DESCRIPTION[this.service.level()]);

  protected readonly rows = computed<WeekRow[]>(() =>
    WEEKDAYS.map((day) => {
      const session = this.service.program.sessions.find((s) => s.day === day);
      const stats = session ? this.service.stats(session.id) : null;
      return {
        day,
        label: WEEKDAY_LABEL[day],
        isToday: day === this.todayDay,
        plan:
          session && stats
            ? { session, stats, progress: this.service.progress(session.id) }
            : null,
      };
    }),
  );

  protected readonly todayRow = computed(() => this.rows().find((r) => r.isToday));

  protected readonly next = computed(() => {
    const list = this.rows();
    const start = list.findIndex((r) => r.isToday);
    for (let k = 1; k <= 7; k++) {
      const row = list[(start + k) % 7];
      if (row.plan) return row;
    }
    return null;
  });

  protected readonly totals = computed(() => {
    const plans = this.rows().flatMap((r) => (r.plan ? [r.plan] : []));
    const unique = new Set(
      this.service.program.sessions.flatMap((s) => s.items.map((i) => i.exerciseId)),
    );
    return [
      { label: 'Sedute a settimana', value: plans.length },
      { label: 'Serie a settimana', value: plans.reduce((sum, p) => sum + p.stats.sets, 0) },
      { label: 'Esercizi in scheda', value: unique.size },
      { label: 'Serie registrate', value: this.service.loggedSets() },
    ];
  });
}
