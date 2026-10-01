import { Component, computed, inject, input } from '@angular/core';
import { Level } from '../models/exercise.model';
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
          @if (item().isAlternative) {
            <p class="mb-2 text-xs font-bold text-accent">
              Alternativa senza sbarra · al posto di {{ item().replaces }}
            </p>
          }
          <p class="text-xs uppercase tracking-wide text-muted">{{ item().exercise.name }}</p>
          <h2 class="mt-1 text-xl font-bold tracking-tight">{{ item().variant.name }}</h2>
        </header>

        <ul class="flex flex-wrap gap-2">
          @for (tag of tags(); track tag) {
            <li class="rounded bg-subtle px-2 py-1 text-xs text-muted">{{ tag }}</li>
          }
        </ul>

        <div class="flex items-center gap-3">
          <span class="text-xs uppercase tracking-wide text-muted">Livello</span>
          <div class="flex flex-1 overflow-hidden rounded border border-line-strong" role="radiogroup" aria-label="Livello esercizio">
            @for (opt of levelOptions; track opt.label) {
              <button
                type="button"
                role="radio"
                class="h-9 flex-1 text-xs"
                [attr.aria-checked]="isActive(opt.value)"
                [class]="isActive(opt.value) ? activeClass : inactiveClass"
                (click)="setOverride(opt.value)"
              >
                {{ opt.label }}
              </button>
            }
          </div>
        </div>

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
    this.service.lastLog(this.sessionId(), this.item().exercise.id, this.item().level),
  );

  protected readonly levelOptions: { value: Level | null; label: string }[] = [
    { value: null, label: 'Auto' },
    { value: 'base', label: 'Base' },
    { value: 'intermedio', label: 'Interm.' },
    { value: 'avanzato', label: 'Avanz.' },
  ];
  protected readonly activeClass = 'bg-indigo-600 text-white';
  protected readonly inactiveClass = 'bg-surface text-body hover:bg-subtle';

  protected isActive(value: Level | null): boolean {
    return this.service.overrideFor(this.item().exercise.id) === value;
  }

  protected setOverride(value: Level | null): void {
    this.service.setOverride(this.item().exercise.id, value);
  }

  protected onSaved(setsCompleted: number[]): void {
    this.service.saveLog({
      sessionId: this.sessionId(),
      exerciseId: this.item().exercise.id,
      date: this.service.today(),
      level: this.item().level,
      setsCompleted,
    });
  }
}
