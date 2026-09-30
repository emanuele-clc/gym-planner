import { Component, computed, inject, input } from '@angular/core';
import { ProgramService, ResolvedItem } from '../services/program.service';
import { ExerciseMedia } from './exercise-media';
import { RestTimer } from './rest-timer';
import { SetTracker } from './set-tracker';

@Component({
  selector: 'app-exercise-card',
  imports: [ExerciseMedia, SetTracker, RestTimer],
  template: `
    <article class="flex h-full flex-col border border-slate-200 bg-white">
      <app-exercise-media [frames]="item().variant.frames" [alt]="item().variant.name" />
      <div class="flex flex-1 flex-col gap-4 p-4">
        <header class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs text-slate-500">{{ index() }}. {{ item().exercise.name }}</p>
            <h2 class="text-base font-semibold tracking-tight">{{ item().variant.name }}</h2>
          </div>
          @if (doneToday()) {
            <span class="border border-indigo-600 px-2 py-1 text-xs text-indigo-600">Fatto oggi</span>
          }
        </header>

        <ul class="flex flex-wrap gap-2">
          @for (tag of tags(); track tag) {
            <li class="border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600">
              {{ tag }}
            </li>
          }
        </ul>

        <dl class="grid grid-cols-3 gap-4 border-y border-slate-200 py-4 text-sm">
          <div>
            <dt class="text-xs text-slate-500">Serie</dt>
            <dd class="text-lg font-semibold">{{ item().prescription.sets }}</dd>
          </div>
          <div>
            <dt class="text-xs text-slate-500">
              {{ item().prescription.target.kind === 'reps' ? 'Ripetizioni' : 'Secondi' }}
            </dt>
            <dd class="text-lg font-semibold">
              {{ item().prescription.target.min }}–{{ item().prescription.target.max }}
            </dd>
          </div>
          <div>
            <dt class="text-xs text-slate-500">Recupero</dt>
            <dd class="text-lg font-semibold">{{ item().prescription.restSeconds }}"</dd>
          </div>
        </dl>

        <ul class="list-disc pl-4 text-sm text-slate-700">
          @for (cue of item().exercise.cues; track cue) {
            <li>{{ cue }}</li>
          }
        </ul>

        @if (item().variant.note) {
          <p class="border-l-2 border-slate-300 pl-4 text-sm text-slate-500">
            {{ item().variant.note }}
          </p>
        }

        <div class="mt-auto flex flex-col gap-4 border-t border-slate-200 pt-4">
          <app-set-tracker [sets]="item().prescription.sets" (saved)="onSaved($event)" />
          <app-rest-timer [seconds]="item().prescription.restSeconds" />
          @if (last(); as l) {
            <p class="text-xs text-slate-500">
              Ultimo salvataggio ({{ l.date }}): {{ l.setsCompleted.join(', ') }}
            </p>
          }
        </div>
      </div>
    </article>
  `,
})
export class ExerciseCard {
  private readonly service = inject(ProgramService);

  readonly item = input.required<ResolvedItem>();
  readonly sessionId = input.required<string>();
  readonly index = input.required<number>();

  protected readonly tags = computed(() => [
    ...this.item().exercise.muscles,
    ...this.item().exercise.equipment.filter((e) => e !== 'nessuno'),
  ]);
  protected readonly doneToday = computed(() =>
    this.service.isLoggedToday(this.sessionId(), this.item().exercise.id),
  );
  protected readonly last = computed(() =>
    this.service.lastLog(this.sessionId(), this.item().exercise.id, this.service.level()),
  );

  protected onSaved(setsCompleted: number[]): void {
    this.service.saveLog({
      sessionId: this.sessionId(),
      exerciseId: this.item().exercise.id,
      date: this.service.today(),
      level: this.service.level(),
      setsCompleted,
    });
  }
}
