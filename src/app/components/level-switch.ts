import { Component, inject } from '@angular/core';
import { LEVELS, LEVEL_LABEL } from '../models/exercise.model';
import { ProgramService } from '../services/program.service';

@Component({
  selector: 'app-level-switch',
  template: `
    <div class="flex w-full border border-line-strong sm:inline-flex sm:w-auto" role="radiogroup" aria-label="Livello">
      @for (l of levels; track l) {
        <button
          type="button"
          role="radio"
          class="flex-1 px-3 py-3 text-sm sm:flex-none sm:py-2"
          [attr.aria-checked]="l === service.level()"
          [class]="l === service.level() ? active : inactive"
          (click)="service.setLevel(l)"
        >
          {{ labels[l] }}
        </button>
      }
    </div>
  `,
})
export class LevelSwitch {
  protected readonly service = inject(ProgramService);
  protected readonly levels = LEVELS;
  protected readonly labels = LEVEL_LABEL;
  protected readonly active = 'bg-indigo-600 text-white';
  protected readonly inactive = 'bg-surface text-body hover:bg-subtle';
}
