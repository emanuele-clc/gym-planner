import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { LANGS } from '../i18n/messages';

@Component({
  selector: 'app-lang-switch',
  template: `
    <div
      class="flex border border-line-strong"
      role="radiogroup"
      [attr.aria-label]="i18n.t().languageAria"
    >
      @for (l of langs; track l) {
        <button
          type="button"
          role="radio"
          class="h-11 px-3 text-sm font-medium uppercase md:h-10"
          [attr.aria-checked]="l === i18n.lang()"
          [attr.lang]="l"
          [attr.title]="names[l]"
          [class]="l === i18n.lang() ? active : inactive"
          (click)="i18n.setLang(l)"
        >
          {{ l }}
        </button>
      }
    </div>
  `,
})
export class LangSwitch {
  protected readonly i18n = inject(I18nService);
  protected readonly langs = LANGS;
  protected readonly names = { it: 'Italiano', en: 'English' };
  protected readonly active = 'bg-indigo-600 text-white';
  protected readonly inactive = 'bg-surface text-body hover:bg-subtle';
}
