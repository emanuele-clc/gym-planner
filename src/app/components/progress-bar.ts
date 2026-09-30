import { Component, computed, input } from '@angular/core';

const DEFAULT_CLASS =
  'block h-2 w-full appearance-none rounded bg-subtle [&::-webkit-progress-bar]:rounded [&::-webkit-progress-bar]:bg-subtle [&::-webkit-progress-value]:rounded [&::-webkit-progress-value]:bg-indigo-500 [&::-moz-progress-bar]:bg-indigo-500';

const ON_ACCENT_CLASS =
  'block h-2 w-full appearance-none rounded bg-indigo-800 [&::-webkit-progress-bar]:rounded [&::-webkit-progress-bar]:bg-indigo-800 [&::-webkit-progress-value]:rounded [&::-webkit-progress-value]:bg-white [&::-moz-progress-bar]:bg-white';

@Component({
  selector: 'app-progress-bar',
  template: `<progress [class]="cls()" [value]="value()" [max]="safeMax()"></progress>`,
})
export class ProgressBar {
  readonly value = input.required<number>();
  readonly max = input.required<number>();
  readonly onAccent = input(false);

  protected readonly safeMax = computed(() => Math.max(this.max(), 1));
  protected readonly cls = computed(() => (this.onAccent() ? ON_ACCENT_CLASS : DEFAULT_CLASS));
}
