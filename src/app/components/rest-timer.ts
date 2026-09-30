import { Component, DestroyRef, computed, inject, input, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-rest-timer',
  template: `
    <div class="flex items-center gap-4 text-sm">
      <span class="text-slate-500">Riposo</span>
      <span class="w-12 font-medium tabular-nums">{{ label() }}</span>
      <button
        type="button"
        class="h-11 border border-slate-300 bg-white px-4 text-slate-700 hover:bg-slate-100"
        (click)="toggle()"
      >
        {{ running() ? 'Stop' : 'Avvia' }}
      </button>
    </div>
  `,
})
export class RestTimer {
  readonly seconds = input.required<number>();

  protected readonly remaining = linkedSignal(() => this.seconds());
  protected readonly running = signal(false);
  protected readonly label = computed(() => {
    const r = this.remaining();
    return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`;
  });

  private handle: ReturnType<typeof setInterval> | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  protected toggle(): void {
    if (this.running()) {
      this.stop();
      this.remaining.set(this.seconds());
      return;
    }
    this.running.set(true);
    this.handle = setInterval(() => {
      this.remaining.update((r) => r - 1);
      if (this.remaining() <= 0) {
        this.stop();
        this.remaining.set(this.seconds());
      }
    }, 1000);
  }

  private stop(): void {
    if (this.handle !== null) {
      clearInterval(this.handle);
      this.handle = null;
    }
    this.running.set(false);
  }
}
