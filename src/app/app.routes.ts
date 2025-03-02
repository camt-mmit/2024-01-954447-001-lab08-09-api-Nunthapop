import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'star-war', pathMatch: 'full' },

  { path: 'star-war', loadChildren: () => import('./sw/routes') },

  { path: 'google', loadChildren: () => import('./gl/routes') },
];
