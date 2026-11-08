import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { ProgramService } from '../services/program.service';

@Component({
  selector: 'app-bands-switch',
  template: `
    <div
      class="flex w-full border border-line-strong sm:inline-flex sm:w-auto"
      role="radiogroup"
      [attr.aria-label]="t().switches.bandsAria"
    >
      @for (opt of options(); track opt.value) {
        <button
          type="button"
          role="radio"
          class="flex-1 px-3 py-3 text-sm sm:flex-none sm:py-2"
          [attr.aria-checked]="opt.value === service.bands()"
          [class]="opt.value === service.bands() ? active : inactive"
          (click)="service.setBands(opt.value)"
        >
          {{ opt.label }}
        </button>
      }
    </div>
  `,
})
export class BandsSwitch {
  protected readonly service = inject(ProgramService);
  protected readonly t = inject(I18nService).t;
  protected readonly options = computed(() => [
    { value: false, label: this.t().switches.noBands },
    { value: true, label: this.t().switches.withBands },
  ]);
  protected readonly active = 'bg-indigo-600 text-white';
  protected readonly inactive = 'bg-surface text-body hover:bg-subtle';
}
