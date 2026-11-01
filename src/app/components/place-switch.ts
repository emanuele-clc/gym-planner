import { Component, inject } from '@angular/core';
import { Place, ProgramService } from '../services/program.service';

interface PlaceOption {
  value: Place;
  label: string;
}

@Component({
  selector: 'app-place-switch',
  template: `
    <div class="flex w-full border border-line-strong sm:inline-flex sm:w-auto" role="radiogroup" aria-label="Dove ti alleni">
      @for (opt of options; track opt.value) {
        <button
          type="button"
          role="radio"
          class="flex-1 px-3 py-3 text-sm sm:flex-none sm:py-2"
          [attr.aria-checked]="opt.value === service.place()"
          [class]="opt.value === service.place() ? active : inactive"
          (click)="service.setPlace(opt.value)"
        >
          {{ opt.label }}
        </button>
      }
    </div>
  `,
})
export class PlaceSwitch {
  protected readonly service = inject(ProgramService);
  protected readonly options: PlaceOption[] = [
    { value: 'palestra', label: 'Palestra' },
    { value: 'casa', label: 'Corpo libero' },
  ];
  protected readonly active = 'bg-indigo-600 text-white';
  protected readonly inactive = 'bg-surface text-body hover:bg-subtle';
}
