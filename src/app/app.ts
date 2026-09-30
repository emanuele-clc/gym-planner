import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LevelSwitch } from './components/level-switch';

interface NavItem {
  path: string;
  label: string;
  exact: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LevelSwitch],
  template: `
    <div class="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header class="z-20 border-b border-slate-200 bg-white md:sticky md:top-0">
        <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 p-4">
          <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a routerLink="/" class="text-base font-semibold tracking-tight">Scheda corpo libero</a>
            <nav class="flex gap-4 text-sm">
              @for (item of nav; track item.path) {
                <a
                  class="border-b-2 border-transparent py-1 text-slate-600 hover:text-slate-900"
                  routerLinkActive="text-indigo-600! border-indigo-600!"
                  [routerLink]="item.path"
                  [routerLinkActiveOptions]="{ exact: item.exact }"
                >
                  {{ item.label }}
                </a>
              }
            </nav>
          </div>
          <app-level-switch class="w-full sm:w-auto" />
        </div>
      </header>

      <main class="mx-auto w-full max-w-6xl flex-1 p-4 md:p-6">
        <router-outlet />
      </main>

      <footer class="border-t border-slate-200 bg-white">
        <div class="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 p-4 text-xs text-slate-500">
          <span>Immagini: free-exercise-db (Unlicense)</span>
          <a href="https://github.com/emanuele-clc/gym-planner" class="hover:text-indigo-600">
            Codice su GitHub
          </a>
        </div>
      </footer>
    </div>
  `,
})
export class App {
  protected readonly nav: NavItem[] = [
    { path: '/', label: 'Settimana', exact: true },
    { path: '/storico', label: 'Storico', exact: false },
    { path: '/guida', label: 'Guida', exact: false },
  ];
}
