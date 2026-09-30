import { Routes } from '@angular/router';
import { Guide } from './components/guide';
import { History } from './components/history';
import { SessionDetail } from './components/session-detail';
import { SessionList } from './components/session-list';

export const routes: Routes = [
  { path: '', component: SessionList },
  { path: 'seduta/:id', component: SessionDetail },
  { path: 'storico', component: History },
  { path: 'guida', component: Guide },
  { path: '**', redirectTo: '' },
];
