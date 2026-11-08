import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { ProgramService } from '../services/program.service';
import { ProgressBar } from './progress-bar';

@Component({
  selector: 'app-guide',
  imports: [ProgressBar],
  template: `
    <h1 class="text-3xl font-bold tracking-tight">{{ t().guide.title }}</h1>

    <section class="mt-6 rounded border border-line bg-surface">
      <div class="p-4">
        <h2 class="text-sm font-semibold">{{ t().guide.volumeTitle }}</h2>
        <p class="mt-1 text-xs text-muted">
          {{ t().guide.volumeNote(levelLabel()) }}
        </p>
      </div>
      <ul>
        @for (row of volume(); track row.muscle) {
          <li
            class="grid grid-cols-[5.5rem_1fr_4.5rem] items-center gap-4 border-t border-line p-4 text-sm"
          >
            <span class="capitalize">{{ t().muscles[row.muscle] }}</span>
            <app-progress-bar [value]="row.sets" [max]="20" />
            <span class="text-right tabular-nums text-muted">
              {{ row.sets }} · {{ row.days }} {{ t().guide.days }}
            </span>
          </li>
        }
      </ul>
    </section>

    <div class="mt-6 grid gap-6 md:grid-cols-2">
      @for (section of sections(); track section.title) {
        <section class="rounded border border-line bg-surface p-4">
          <h2 class="text-sm font-semibold">{{ section.title }}</h2>
          <ul class="mt-4 list-disc pl-4 text-sm text-body">
            @for (item of section.items; track item) {
              <li class="mb-2">{{ item }}</li>
            }
          </ul>
        </section>
      }
    </div>
  `,
})
export class Guide {
  private readonly service = inject(ProgramService);

  protected readonly t = inject(I18nService).t;
  protected readonly sections = computed(() => {
    const g = this.t().guide;
    return [...(this.service.place() === 'palestra' ? g.gym : g.home), ...g.shared];
  });
  protected readonly volume = computed(() => this.service.weeklyVolume());
  protected readonly levelLabel = computed(() => this.t().levels[this.service.level()]);
}
