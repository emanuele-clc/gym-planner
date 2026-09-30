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
        <div class="border border-slate-200 bg-white p-6 lg:col-span-2">
          @if (todayRow(); as t) {
            <p class="text-xs uppercase text-slate-500">Oggi · {{ t.label }}</p>
            @if (t.plan; as p) {
              <h1 class="mt-2 text-3xl font-semibold tracking-tight">{{ p.session.title }}</h1>
              <dl class="mt-6 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <dt class="text-xs text-slate-500">Esercizi</dt>
                  <dd class="text-xl font-semibold">{{ p.stats.exercises }}</dd>
                </div>
                <div>
                  <dt class="text-xs text-slate-500">Serie</dt>
                  <dd class="text-xl font-semibold">{{ p.stats.sets }}</dd>
                </div>
                <div>
                  <dt class="text-xs text-slate-500">Durata stimata</dt>
                  <dd class="text-xl font-semibold">{{ p.stats.minutes }} min</dd>
                </div>
              </dl>
              <p class="mt-6 text-sm text-slate-600">
                Muscoli: {{ p.stats.muscles.join(', ') }}
              </p>
              <p class="mt-2 text-sm text-slate-600">
                Attrezzatura: {{ p.stats.equipment.length ? p.stats.equipment.join(', ') : 'nessuna' }}
              </p>
              <a
                class="mt-6 block bg-indigo-600 px-6 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 sm:inline-block"
                [routerLink]="['/seduta', p.session.id]"
              >
                Apri seduta
              </a>
            } @else {
              <h1 class="mt-2 text-3xl font-semibold tracking-tight">Riposo</h1>
              @if (next(); as n) {
                <p class="mt-4 text-sm text-slate-600">
                  Prossima seduta: {{ n.label }} · {{ n.plan?.session?.title }}
                </p>
              }
            }
          }
        </div>

        <div class="border border-slate-200 bg-white p-6">
          <p class="text-xs uppercase text-slate-500">Livello attuale</p>
          <h2 class="mt-2 text-xl font-semibold tracking-tight">{{ levelLabel() }}</h2>
          <p class="mt-4 text-sm text-slate-600">{{ levelDescription() }}</p>
        </div>
      </section>

      <section class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        @for (stat of totals(); track stat.label) {
          <div class="border border-slate-200 bg-white p-4">
            <p class="text-xs text-slate-500">{{ stat.label }}</p>
            <p class="mt-1 text-2xl font-semibold tabular-nums">{{ stat.value }}</p>
          </div>
        }
      </section>

      <section>
        <h2 class="mb-4 text-xs uppercase text-slate-500">Settimana</h2>
        <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (row of rows(); track row.day) {
            <li>
              @if (row.plan; as p) {
                <a
                  class="flex h-full flex-col gap-4 border bg-white p-4 hover:border-indigo-600"
                  [class]="row.isToday ? 'border-indigo-600' : 'border-slate-200'"
                  [routerLink]="['/seduta', p.session.id]"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-xs uppercase text-slate-500">{{ row.label }}</span>
                    @if (row.isToday) {
                      <span class="text-xs text-indigo-600">Oggi</span>
                    }
                  </div>
                  <div>
                    <p class="text-lg font-semibold tracking-tight">{{ p.session.title }}</p>
                    <p class="mt-1 text-sm text-slate-500">{{ p.stats.muscles.join(', ') }}</p>
                  </div>
                  <p class="mt-auto text-sm text-slate-600">
                    {{ p.stats.exercises }} esercizi · {{ p.stats.sets }} serie · {{ p.stats.minutes }} min
                  </p>
                  <div>
                    <app-progress-bar [value]="p.progress.done" [max]="p.progress.total" />
                    <p class="mt-2 text-xs text-slate-500">
                      {{ p.progress.done }}/{{ p.progress.total }} registrati questa settimana
                    </p>
                  </div>
                </a>
              } @else {
                <div
                  class="flex h-full flex-col gap-2 border border-slate-200 bg-slate-100 p-4"
                  [class]="row.isToday ? 'border-indigo-600' : 'border-slate-200'"
                >
                  <span class="text-xs uppercase text-slate-500">{{ row.label }}</span>
                  <p class="text-lg font-semibold tracking-tight text-slate-500">Riposo</p>
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
