import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEVEL_LABEL } from '../models/exercise.model';
import { WEEKDAY_LABEL } from '../models/program.model';
import { ProgramService } from '../services/program.service';
import { BarSwitch } from './bar-switch';
import { ExerciseCard } from './exercise-card';
import { ProgressBar } from './progress-bar';

@Component({
  selector: 'app-session-detail',
  imports: [RouterLink, ExerciseCard, ProgressBar, BarSwitch],
  template: `
    <a routerLink="/" class="text-sm text-accent hover:underline">Settimana</a>

    @if (session(); as s) {
      @if (stats(); as st) {
        <header class="mt-4 rounded bg-indigo-600 p-6 text-white md:p-8">
          <p class="text-xs font-medium uppercase tracking-widest text-indigo-200">
            {{ dayLabel() }}
          </p>
          <h1 class="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{{ s.title }}</h1>

          <dl class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <dt class="text-xs uppercase tracking-wide text-indigo-200">Esercizi</dt>
              <dd class="mt-1 text-3xl font-bold">{{ st.exercises }}</dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-wide text-indigo-200">Serie</dt>
              <dd class="mt-1 text-3xl font-bold">{{ st.sets }}</dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-wide text-indigo-200">Durata stimata</dt>
              <dd class="mt-1 text-3xl font-bold">{{ st.minutes }} min</dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-wide text-indigo-200">Livello</dt>
              <dd class="mt-1 text-3xl font-bold">{{ levelLabel() }}</dd>
            </div>
          </dl>

          <p class="mt-8 text-sm text-indigo-100">
            Attrezzatura: {{ st.equipment.length ? st.equipment.join(', ') : 'nessuna' }}
          </p>

          <div class="mt-4">
            <app-progress-bar [value]="progress().done" [max]="progress().total" [onAccent]="true" />
            <p class="mt-2 text-xs text-indigo-200">
              {{ progress().done }} di {{ progress().total }} esercizi registrati questa settimana
            </p>
          </div>
        </header>
      }

      <div class="mt-6">
        <nav
          class="sticky top-0 z-10 -mx-4 mb-6 flex gap-2 overflow-x-auto border-b border-line bg-surface p-4 lg:hidden"
          aria-label="Esercizi"
        >
          @for (item of items(); track item.exercise.id; let i = $index) {
            <button
              type="button"
              class="h-10 w-10 shrink-0 rounded border text-sm font-medium tabular-nums"
              [class]="
                isDone(item.exercise.id)
                  ? 'border-accent bg-indigo-600 text-white'
                  : 'border-line-strong text-body'
              "
              (click)="scrollTo(i)"
            >
              {{ i + 1 }}
            </button>
          }
        </nav>

        <div class="grid gap-6 lg:grid-cols-[14rem_1fr]">
          <aside class="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <nav class="overflow-hidden rounded border border-line bg-surface">
              <p class="p-4 text-xs font-medium uppercase tracking-widest text-muted">Esercizi</p>
              @for (item of items(); track item.exercise.id; let i = $index) {
                <button
                  type="button"
                  class="flex w-full items-center gap-4 border-t border-line p-4 text-left text-sm hover:bg-subtle"
                  (click)="scrollTo(i)"
                >
                  <span class="w-4 font-bold tabular-nums text-accent">{{ i + 1 }}</span>
                  <span class="flex-1">{{ item.variant.name }}</span>
                  @if (isDone(item.exercise.id)) {
                    <span class="text-xs font-bold text-accent">Fatto</span>
                  }
                </button>
              }
            </nav>
          </aside>

          <div class="flex flex-col gap-6">
            @if (hasBarItems()) {
              <section class="rounded border border-line bg-surface p-4">
                <h2 class="text-sm font-bold">Esercizi alla sbarra</h2>
                <p class="mt-1 text-sm text-muted">
                  Ogni esercizio alla sbarra ha un’alternativa senza sbarra. Cambia tutta la seduta qui,
                  oppure un esercizio alla volta dal pulsante nella card.
                </p>
                <app-bar-switch class="mt-4 block" />
              </section>
            }

            <details class="rounded border border-line bg-surface p-4" open>
              <summary class="cursor-pointer text-sm font-bold">Riscaldamento · 8 min</summary>
              <ul class="mt-4 list-disc pl-4 text-sm text-body">
                @for (step of warmup; track step) {
                  <li class="mb-1">{{ step }}</li>
                }
              </ul>
            </details>

            <div class="grid gap-6 md:grid-cols-2">
              @for (item of items(); track item.exercise.id; let i = $index) {
                <div class="scroll-mt-20" [id]="'ex-' + i">
                  <app-exercise-card [item]="item" [sessionId]="s.id" [index]="i + 1" />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    } @else {
      <p class="mt-4 text-sm text-muted">Seduta non trovata.</p>
    }
  `,
})
export class SessionDetail {
  private readonly service = inject(ProgramService);

  readonly id = input.required<string>();

  protected readonly warmup = this.service.program.warmup;
  protected readonly session = computed(() => this.service.session(this.id()));
  protected readonly items = computed(() => this.service.items(this.id()));
  protected readonly stats = computed(() => this.service.stats(this.id()));
  protected readonly hasBarItems = computed(() => this.items().some((i) => i.swapLabel !== undefined));
  protected readonly progress = computed(() => this.service.progress(this.id()));
  protected readonly levelLabel = computed(() => LEVEL_LABEL[this.service.level()]);
  protected readonly dayLabel = computed(() => {
    const s = this.session();
    return s ? WEEKDAY_LABEL[s.day] : '';
  });

  protected isDone(exerciseId: string): boolean {
    return this.service.isLoggedToday(this.id(), exerciseId);
  }

  protected scrollTo(index: number): void {
    document.getElementById(`ex-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
