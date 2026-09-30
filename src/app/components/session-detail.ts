import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgramService } from '../services/program.service';
import { ExerciseCard } from './exercise-card';

@Component({
  selector: 'app-session-detail',
  imports: [RouterLink, ExerciseCard],
  template: `
    <a routerLink="/" class="text-sm text-indigo-600 hover:underline">Settimana</a>

    @if (session(); as s) {
      <h1 class="mt-4 text-xl font-semibold">{{ s.title }}</h1>

      <section class="mt-4 border border-slate-200 bg-white p-4">
        <h2 class="text-sm font-semibold">Riscaldamento</h2>
        <ul class="mt-2 list-disc pl-4 text-sm text-slate-700">
          @for (step of warmup; track step) {
            <li>{{ step }}</li>
          }
        </ul>
      </section>

      <div class="mt-6 flex flex-col gap-6">
        @for (item of items(); track item.exercise.id) {
          <app-exercise-card [item]="item" [sessionId]="s.id" />
        }
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
}
