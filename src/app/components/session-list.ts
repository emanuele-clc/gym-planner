import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WEEKDAYS, WEEKDAY_LABEL } from '../models/program.model';
import { ProgramService } from '../services/program.service';

@Component({
  selector: 'app-session-list',
  imports: [RouterLink],
  template: `
    <ul class="flex flex-col gap-2">
      @for (row of rows; track row.day) {
        <li>
          @if (row.session; as s) {
            <a
              class="flex items-center justify-between border border-slate-200 bg-white p-4 hover:border-indigo-600"
              [routerLink]="['/seduta', s.id]"
            >
              <span class="flex flex-col">
                <span class="text-xs uppercase text-slate-500">{{ row.label }}</span>
                <span class="text-base font-medium">{{ s.title }}</span>
              </span>
              <span class="text-sm text-slate-500">{{ s.items.length }} esercizi</span>
            </a>
          } @else {
            <div class="border border-slate-200 bg-slate-100 p-4 text-sm text-slate-500">
              {{ row.label }} · Riposo
            </div>
          }
        </li>
      }
    </ul>
  `,
})
export class SessionList {
  private readonly service = inject(ProgramService);

  protected readonly rows = WEEKDAYS.map((day) => ({
    day,
    label: WEEKDAY_LABEL[day],
    session: this.service.program.sessions.find((s) => s.day === day),
  }));
}
