import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `
    <progress
      class="block h-1 w-full appearance-none bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-indigo-600 [&::-moz-progress-bar]:bg-indigo-600"
      [value]="value()"
      [max]="safeMax()"
    ></progress>
  `,
})
export class ProgressBar {
  readonly value = input.required<number>();
  readonly max = input.required<number>();

  protected readonly safeMax = computed(() => Math.max(this.max(), 1));
}
