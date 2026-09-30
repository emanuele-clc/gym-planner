import { Component, computed, inject, input } from '@angular/core';
import { ProgramService, ResolvedItem } from '../services/program.service';
import { ExerciseMedia } from './exercise-media';
import { RestTimer } from './rest-timer';
import { SetTracker } from './set-tracker';

@Component({
  selector: 'app-exercise-card',
  imports: [ExerciseMedia, SetTracker, RestTimer],
  template: `
    <article class="border border-slate-200 bg-white">
      <app-exercise-media [frames]="item().variant.frames" [alt]="item().variant.name" />
      <div class="flex flex-col gap-4 p-4">
        <header>
          <h2 class="text-base font-semibold">{{ item().variant.name }}</h2>
          <p class="text-sm text-slate-500">{{ item().exercise.name }} · {{ muscles() }}</p>
        </header>

        <dl class="grid grid-cols-3 gap-4 text-sm">
          <div>
            <dt class="text-slate-500">Serie</dt>
            <dd class="font-medium">{{ item().prescription.sets }}</dd>
          </div>
          <div>
            <dt class="text-slate-500">
              {{ item().prescription.target.kind === 'reps' ? 'Ripetizioni' : 'Secondi' }}
            </dt>
            <dd class="font-medium">
              {{ item().prescription.target.min }}–{{ item().prescription.target.max }}
            </dd>
          </div>
          <div>
            <dt class="text-slate-500">Recupero</dt>
            <dd class="font-medium">{{ item().prescription.restSeconds }}"</dd>
          </div>
        </dl>

        <ul class="list-disc pl-4 text-sm text-slate-700">
          @for (cue of item().exercise.cues; track cue) {
            <li>{{ cue }}</li>
          }
        </ul>

        @if (item().variant.note) {
          <p class="text-sm text-slate-500">{{ item().variant.note }}</p>
        }

        <app-set-tracker [sets]="item().prescription.sets" (saved)="onSaved($event)" />
        <app-rest-timer [seconds]="item().prescription.restSeconds" />

        @if (last(); as l) {
          <p class="text-xs text-slate-500">
            Ultimo salvataggio ({{ l.date }}): {{ l.setsCompleted.join(', ') }}
          </p>
        }
      </div>
    </article>
  `,
})
export class ExerciseCard {
  private readonly service = inject(ProgramService);

  readonly item = input.required<ResolvedItem>();
  readonly sessionId = input.required<string>();

  protected readonly muscles = computed(() => this.item().exercise.muscles.join(', '));
  protected readonly last = computed(() =>
    this.service.lastLog(this.sessionId(), this.item().exercise.id, this.service.level()),
  );

  protected onSaved(setsCompleted: number[]): void {
    this.service.saveLog({
      sessionId: this.sessionId(),
      exerciseId: this.item().exercise.id,
      date: new Date().toISOString().slice(0, 10),
      level: this.service.level(),
      setsCompleted,
    });
  }
}
