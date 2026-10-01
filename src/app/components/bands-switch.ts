import { Component, inject } from '@angular/core';
import { ProgramService } from '../services/program.service';

interface BandsOption {
  value: boolean;
  label: string;
}

@Component({
  selector: 'app-bands-switch',
  template: `
    <div class="flex w-full border border-line-strong sm:inline-flex sm:w-auto" role="radiogroup" aria-label="Elastici">
      @for (opt of options; track opt.label) {
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
  protected readonly options: BandsOption[] = [
    { value: false, label: 'Senza elastici' },
    { value: true, label: 'Con elastici' },
  ];
  protected readonly active = 'bg-indigo-600 text-white';
  protected readonly inactive = 'bg-surface text-body hover:bg-subtle';
}
