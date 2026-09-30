import { Component, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'app-set-tracker',
  template: `
    <div class="flex flex-wrap items-end gap-2">
      @for (v of values(); track $index) {
        <label class="flex flex-col gap-1 text-xs text-muted">
          S{{ $index + 1 }}
          <input
            type="number"
            inputmode="numeric"
            min="0"
            class="h-11 w-16 border border-line-strong bg-surface p-2 text-base text-ink"
            [value]="v ?? ''"
            (input)="update($index, $event)"
          />
        </label>
      }
      <button
        type="button"
        class="h-11 bg-indigo-600 px-4 text-sm text-white hover:bg-indigo-700"
        (click)="save()"
      >
        {{ isSaved() ? 'Salvato' : 'Salva' }}
      </button>
    </div>
  `,
})
export class SetTracker {
  readonly sets = input.required<number>();
  readonly saved = output<number[]>();

  protected readonly values = linkedSignal<(number | null)[]>(() =>
    Array.from({ length: this.sets() }, () => null),
  );
  protected readonly isSaved = linkedSignal(() => {
    this.sets();
    return false;
  });

  protected update(index: number, event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    const parsed = raw === '' ? null : Number(raw);
    this.values.update((prev) => prev.map((v, i) => (i === index ? parsed : v)));
    this.isSaved.set(false);
  }

  protected save(): void {
    this.saved.emit(this.values().map((v) => v ?? 0));
    this.isSaved.set(true);
  }
}
