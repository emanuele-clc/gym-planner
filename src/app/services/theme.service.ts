import { Injectable, effect, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

const THEME_KEY = 'cp.theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark');

  constructor() {
    effect(() => {
      const theme = this.theme();
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem(THEME_KEY, theme);
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }
}
