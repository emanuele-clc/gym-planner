import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEVEL_LABEL } from '../models/exercise.model';
import { WEEKDAY_LABEL } from '../models/program.model';
import { ProgramService } from '../services/program.service';
import { ExerciseCard } from './exercise-card';
import { ProgressBar } from './progress-bar';

@Component({
  selector: 'app-session-detail',
  imports: [RouterLink, ExerciseCard, ProgressBar],
  template: `
    <a routerLink="/" class="text-sm text-indigo-600 hover:underline">Settimana</a>

    @if (session(); as s) {
      @if (stats(); as st) {
        <header class="mt-4 border border-slate-200 bg-white p-6">
          <p class="text-xs uppercase text-slate-500">{{ dayLabel() }}</p>
          <h1 class="mt-1 text-2xl font-semibold tracking-tight">{{ s.title }}</h1>

          <dl class="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div>
              <dt class="text-xs text-slate-500">Esercizi</dt>
              <dd class="text-lg font-semibold">{{ st.exercises }}</dd>
            </div>
            <div>
              <dt class="text-xs text-slate-500">Serie</dt>
              <dd class="text-lg font-semibold">{{ st.sets }}</dd>
            </div>
            <div>
              <dt class="text-xs text-slate-500">Durata stimata</dt>
              <dd class="text-lg font-semibold">{{ st.minutes }} min</dd>
            </div>
            <div>
              <dt class="text-xs text-slate-500">Livello</dt>
              <dd class="text-lg font-semibold">{{ levelLabel() }}</dd>
            </div>
          </dl>

          <p class="mt-6 text-sm text-slate-600">
            Attrezzatura: {{ st.equipment.length ? st.equipment.join(', ') : 'nessuna' }}
          </p>

          <div class="mt-4">
            <app-progress-bar [value]="progress().done" [max]="progress().total" />
            <p class="mt-2 text-xs text-slate-500">
              {{ progress().done }} di {{ progress().total }} esercizi registrati questa settimana
            </p>
          </div>
        </header>
      }

      <div class="mt-6">
        <nav
          class="sticky top-0 z-10 -mx-4 mb-6 flex gap-2 overflow-x-auto border-b border-slate-200 bg-white p-4 lg:hidden"
          aria-label="Esercizi"
        >
          @for (item of items(); track item.exercise.id; let i = $index) {
            <button
              type="button"
              class="h-10 w-10 shrink-0 border text-sm tabular-nums"
              [class]="
                isDone(item.exercise.id)
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-slate-300 text-slate-700'
              "
              (click)="scrollTo(i)"
            >
              {{ i + 1 }}
            </button>
          }
        </nav>

      <div class="grid gap-6 lg:grid-cols-[14rem_1fr]">
        <aside class="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <nav class="border border-slate-200 bg-white">
            <p class="p-4 text-xs uppercase text-slate-500">Esercizi</p>
            @for (item of items(); track item.exercise.id; let i = $index) {
              <button
                type="button"
                class="flex w-full items-center gap-4 border-t border-slate-200 p-4 text-left text-sm hover:bg-slate-100"
                (click)="scrollTo(i)"
              >
                <span class="w-4 tabular-nums text-slate-500">{{ i + 1 }}</span>
                <span class="flex-1">{{ item.variant.name }}</span>
                @if (isDone(item.exercise.id)) {
                  <span class="text-xs text-indigo-600">Fatto</span>
                }
              </button>
            }
          </nav>
        </aside>

        <div class="flex flex-col gap-6">
          <details class="border border-slate-200 bg-white p-4" open>
            <summary class="cursor-pointer text-sm font-semibold">Riscaldamento · 8 min</summary>
            <ul class="mt-4 list-disc pl-4 text-sm text-slate-700">
              @for (step of warmup; track step) {
                <li>{{ step }}</li>
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
      <p class="mt-4 text-sm text-slate-500">Seduta non trovata.</p>
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
