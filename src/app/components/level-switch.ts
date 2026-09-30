import { Component, inject } from '@angular/core';
import { LEVELS, LEVEL_LABEL } from '../models/exercise.model';
import { ProgramService } from '../services/program.service';

@Component({
  selector: 'app-level-switch',
  template: `
    <div class="inline-flex border border-slate-300" role="radiogroup" aria-label="Livello">
      @for (l of levels; track l) {
        <button
          type="button"
          role="radio"
          class="px-3 py-2 text-sm"
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
  protected readonly inactive = 'bg-white text-slate-700 hover:bg-slate-100';
}
