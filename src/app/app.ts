import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LevelSwitch } from './components/level-switch';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, LevelSwitch],
  template: `
    <div class="min-h-screen bg-slate-50 text-slate-900">
      <header class="border-b border-slate-200 bg-white">
        <div class="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 p-4">
          <a routerLink="/" class="text-base font-semibold">Scheda corpo libero</a>
          <app-level-switch />
        </div>
      </header>
      <main class="mx-auto max-w-3xl p-4">
        <router-outlet />
      </main>
      <footer class="mx-auto max-w-3xl p-4 text-xs text-slate-500">
        Immagini: free-exercise-db (Unlicense).
      </footer>
    </div>
  `,
})
export class App {}
