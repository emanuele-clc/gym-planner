import { Component, computed, inject, input } from '@angular/core';
import { ProgramService, ResolvedItem } from '../services/program.service';
import { ExerciseMedia } from './exercise-media';
import { RestTimer } from './rest-timer';
import { SetTracker } from './set-tracker';

@Component({
  selector: 'app-exercise-card',
  imports: [ExerciseMedia, SetTracker, RestTimer],
  template: `
    <article class="flex h-full flex-col overflow-hidden rounded border border-line bg-surface">
      <div class="relative">
        <app-exercise-media [frames]="item().variant.frames" [alt]="item().variant.name" />
        <span class="absolute left-0 top-0 bg-indigo-600 px-4 py-2 text-sm font-bold text-white">
          {{ index() }}
        </span>
        @if (doneToday()) {
          <span class="absolute right-0 top-0 bg-surface px-3 py-2 text-xs font-bold text-accent">
            Fatto oggi
          </span>
        }
      </div>

      <div class="flex flex-1 flex-col gap-4 p-4">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted">{{ item().exercise.name }}</p>
          <h2 class="mt-1 text-xl font-bold tracking-tight">{{ item().variant.name }}</h2>
        </header>

        <ul class="flex flex-wrap gap-2">
          @for (tag of tags(); track tag) {
            <li class="rounded bg-subtle px-2 py-1 text-xs text-muted">{{ tag }}</li>
          }
        </ul>

        <dl class="grid grid-cols-3 gap-4 border-y border-line py-4">
          <div>
            <dt class="text-xs uppercase tracking-wide text-muted">Serie</dt>
            <dd class="mt-1 text-2xl font-bold">{{ item().prescription.sets }}</dd>
          </div>
          <div>
            <dt class="text-xs uppercase tracking-wide text-muted">
              {{ item().prescription.target.kind === 'reps' ? 'Rip.' : 'Secondi' }}
            </dt>
            <dd class="mt-1 text-2xl font-bold">
              {{ item().prescription.target.min }}–{{ item().prescription.target.max }}
            </dd>
          </div>
          <div>
            <dt class="text-xs uppercase tracking-wide text-muted">Recupero</dt>
            <dd class="mt-1 text-2xl font-bold">{{ item().prescription.restSeconds }}"</dd>
          </div>
        </dl>

        <ul class="list-disc pl-4 text-sm text-body">
          @for (cue of item().exercise.cues; track cue) {
            <li class="mb-1">{{ cue }}</li>
          }
        </ul>

        @if (item().variant.note) {
          <p class="border-l-2 border-accent pl-4 text-sm text-muted">{{ item().variant.note }}</p>
        }

        <div class="mt-auto flex flex-col gap-4 border-t border-line pt-4">
          <app-set-tracker [sets]="item().prescription.sets" (saved)="onSaved($event)" />
          <app-rest-timer [seconds]="item().prescription.restSeconds" />
          @if (last(); as l) {
            <p class="text-xs text-muted">
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
