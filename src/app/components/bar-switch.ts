import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { BarMode, ProgramService } from '../services/program.service';

interface BarOption {
  value: BarMode;
  label: string;
}

@Component({
  selector: 'app-bar-switch',
  template: `
    <div
      class="flex w-full border border-line-strong sm:inline-flex sm:w-auto"
      role="radiogroup"
      [attr.aria-label]="t().switches.barAria"
    >
      @for (opt of options(); track opt.value) {
        <button
          type="button"
          role="radio"
          class="flex-1 px-3 py-3 text-sm sm:flex-none sm:py-2"
          [attr.aria-checked]="opt.value === service.barMode()"
          [class]="opt.value === service.barMode() ? active : inactive"
          (click)="service.setBarMode(opt.value)"
        >
          {{ opt.label }}
        </button>
      }
    </div>
  `,
})
export class BarSwitch {
  protected readonly service = inject(ProgramService);
  protected readonly t = inject(I18nService).t;
  protected readonly options = computed<BarOption[]>(() => [
    { value: 'con', label: this.t().switches.withBar },
    { value: 'senza', label: this.t().switches.noBar },
  ]);
  protected readonly active = 'bg-indigo-600 text-white';
  protected readonly inactive = 'bg-surface text-body hover:bg-subtle';
}
