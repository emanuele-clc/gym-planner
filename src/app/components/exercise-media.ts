import { Component, effect, input, linkedSignal } from '@angular/core';

@Component({
  selector: 'app-exercise-media',
  template: `
    @if (!failed()) {
      <img
        class="aspect-4/3 w-full bg-subtle object-contain"
        loading="lazy"
        [src]="frames()[index()]"
        [alt]="alt()"
        (error)="failed.set(true)"
      />
    } @else {
      <div
        class="flex aspect-4/3 w-full items-center justify-center border-b border-dashed border-line-strong bg-subtle p-4 text-center text-xs text-muted"
      >
        [Media mancante: public/{{ frames()[0] }}]
      </div>
    }
  `,
})
export class ExerciseMedia {
  readonly frames = input.required<string[]>();
  readonly alt = input.required<string>();

  protected readonly index = linkedSignal(() => {
    this.frames();
    return 0;
  });
  protected readonly failed = linkedSignal(() => {
    this.frames();
    return false;
  });

  constructor() {
    effect((onCleanup) => {
      const count = this.frames().length;
      if (count < 2) return;
      const handle = setInterval(() => this.index.update((i) => (i + 1) % count), 900);
      onCleanup(() => clearInterval(handle));
    });
  }
}
