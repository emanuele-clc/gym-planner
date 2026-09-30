import { Routes } from '@angular/router';
import { SessionDetail } from './components/session-detail';
import { SessionList } from './components/session-list';

export const routes: Routes = [
  { path: '', component: SessionList },
  { path: 'seduta/:id', component: SessionDetail },
  { path: '**', redirectTo: '' },
];
