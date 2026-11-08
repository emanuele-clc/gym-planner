import { Component, computed, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BandsSwitch } from './components/bands-switch';
import { BarSwitch } from './components/bar-switch';
import { LangSwitch } from './components/lang-switch';
import { LevelSwitch } from './components/level-switch';
import { PlaceSwitch } from './components/place-switch';
import { I18nService } from './i18n/i18n.service';
import { ProgramService } from './services/program.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LevelSwitch,
    BarSwitch,
    BandsSwitch,
    PlaceSwitch,
    LangSwitch,
  ],
  template: `
    <div class="flex min-h-screen flex-col bg-page text-ink">
      <header class="z-20 border-b border-line bg-surface md:sticky md:top-0">
        <div class="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-4 p-4">
          <a routerLink="/" class="flex items-center gap-3 text-base font-bold tracking-tight">
            <img src="icon-192.png" alt="" class="h-8 w-8 rounded" />
            {{ title() }}
          </a>
          <nav class="order-last flex w-full gap-6 text-sm md:order-none md:w-auto">
            @for (item of nav(); track item.path) {
              <a
                class="border-b-2 border-transparent py-1 text-muted hover:text-ink"
                routerLinkActive="text-accent! border-accent!"
                [routerLink]="item.path"
                [routerLinkActiveOptions]="{ exact: item.exact }"
              >
                {{ item.label }}
              </a>
            }
          </nav>
          <div class="flex w-full flex-wrap items-center gap-4 md:ml-auto md:w-auto">
            <app-place-switch class="w-full sm:w-auto" />
            <app-level-switch class="w-full sm:w-auto" />
            @if (programService.place() === 'casa') {
              <app-bar-switch class="flex-1 sm:flex-none" />
              <app-bands-switch class="flex-1 sm:flex-none" />
            }
            <button
              type="button"
              class="h-11 shrink-0 rounded border border-line-strong px-4 text-sm text-body hover:bg-subtle md:h-10"
              (click)="themeService.toggle()"
            >
              {{ themeService.theme() === 'dark' ? t().themeLight : t().themeDark }}
            </button>
            <app-lang-switch class="shrink-0" />
          </div>
        </div>
      </header>

      <main class="mx-auto w-full max-w-6xl flex-1 p-4 md:p-6">
        <router-outlet />
      </main>

      <footer class="border-t border-line bg-surface">
        <div class="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 p-4 text-xs text-muted">
          <span>
            {{ t().footerImages }}: free-exercise-db (Unlicense) ·
            <a href="https://repdb.co" class="hover:text-accent"
              >Exercise data by RepDB (repdb.co)</a
            >
          </span>
          <a href="https://github.com/emanuele-clc/gym-planner" class="hover:text-accent">
            {{ t().footerCode }}
          </a>
        </div>
      </footer>
    </div>
  `,
})
export class App {
  protected readonly themeService = inject(ThemeService);
  protected readonly programService = inject(ProgramService);
  protected readonly t = inject(I18nService).t;
  protected readonly title = computed(() => this.t().appTitle[this.programService.place()]);
  protected readonly nav = computed(() => [
    { path: '/', label: this.t().nav.week, exact: true },
    { path: '/storico', label: this.t().nav.history, exact: false },
    { path: '/guida', label: this.t().nav.guide, exact: false },
  ]);

  constructor() {
    effect(() => {
      document.title = this.title();
    });
  }
}
