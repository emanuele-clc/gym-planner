import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { LEVELS } from '../models/exercise.model';
import { ProgramService } from '../services/program.service';

@Component({
  selector: 'app-level-switch',
  template: `
    <div
      class="flex w-full border border-line-strong sm:inline-flex sm:w-auto"
      role="radiogroup"
      [attr.aria-label]="t().switches.levelAria"
    >
      @for (l of levels; track l) {
        <button
          type="button"
          role="radio"
          class="flex-1 px-3 py-3 text-sm sm:flex-none sm:py-2"
          [attr.aria-checked]="l === service.level()"
          [class]="l === service.level() ? active : inactive"
          (click)="service.setLevel(l)"
        >
          {{ t().levels[l] }}
        </button>
      }
    </div>
  `,
})
export class LevelSwitch {
  protected readonly service = inject(ProgramService);
  protected readonly levels = LEVELS;
  protected readonly t = inject(I18nService).t;
  protected readonly active = 'bg-indigo-600 text-white';
  protected readonly inactive = 'bg-surface text-body hover:bg-subtle';
}
