import { Injectable, computed, effect, signal } from '@angular/core';
import { LANGS, Lang, MESSAGES, Messages } from './messages';

const LANG_KEY = 'cp.lang';

const isLang = (value: unknown): value is Lang =>
  typeof value === 'string' && (LANGS as readonly string[]).includes(value);

/** Lingua salvata, altrimenti quella del browser (italiano se è italiano, inglese negli altri casi). */
const readLang = (): Lang => {
  const raw = localStorage.getItem(LANG_KEY);
  if (isLang(raw)) return raw;
  return navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en';
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>(readLang());
  readonly t = computed<Messages>(() => MESSAGES[this.lang()]);

  constructor() {
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang;
      localStorage.setItem(LANG_KEY, lang);
    });
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
  }
}
