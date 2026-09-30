import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LevelSwitch } from './components/level-switch';
import { ThemeService } from './services/theme.service';

interface NavItem {
  path: string;
  label: string;
  exact: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LevelSwitch],
  template: `
    <div class="flex min-h-screen flex-col bg-page text-ink">
      <header class="z-20 border-b border-line bg-surface md:sticky md:top-0">
        <div class="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-4 p-4">
          <a routerLink="/" class="flex items-center gap-3 text-base font-bold tracking-tight">
            <img src="icon-192.png" alt="" class="h-8 w-8 rounded" />
            Scheda corpo libero
          </a>
          <nav class="order-last flex w-full gap-6 text-sm md:order-none md:w-auto">
            @for (item of nav; track item.path) {
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
          <div class="flex w-full items-center gap-4 md:ml-auto md:w-auto">
            <app-level-switch class="flex-1 md:flex-none" />
            <button
              type="button"
              class="h-11 shrink-0 rounded border border-line-strong px-4 text-sm text-body hover:bg-subtle md:h-10"
              (click)="themeService.toggle()"
            >
              {{ themeService.theme() === 'dark' ? 'Chiaro' : 'Scuro' }}
            </button>
          </div>
        </div>
      </header>

      <main class="mx-auto w-full max-w-6xl flex-1 p-4 md:p-6">
        <router-outlet />
      </main>

      <footer class="border-t border-line bg-surface">
        <div class="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 p-4 text-xs text-muted">
          <span>
            Immagini: free-exercise-db (Unlicense) ·
            <a href="https://repdb.co" class="hover:text-accent">Exercise data by RepDB (repdb.co)</a>
          </span>
          <a href="https://github.com/emanuele-clc/gym-planner" class="hover:text-accent">
            Codice su GitHub
          </a>
        </div>
      </footer>
    </div>
  `,
})
export class App {
  protected readonly themeService = inject(ThemeService);
  protected readonly nav: NavItem[] = [
    { path: '/', label: 'Settimana', exact: true },
    { path: '/storico', label: 'Storico', exact: false },
    { path: '/guida', label: 'Guida', exact: false },
  ];
}
