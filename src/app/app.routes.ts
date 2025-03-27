import { Routes } from '@angular/router';
import { SwSpeciesListComponent } from './sw/components/species/sw-species-list/sw-species-list.component';
import { SwSpeciesViewComponent } from './sw/components/species/sw-species-view/sw-species-view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'star-war', pathMatch: 'full' },

  { path: 'star-war', loadChildren: () => import('./sw/routes') },

  { path: 'google', loadChildren: () => import('./gl/routes') },
  {
    path: 'species',
    children: [
      { path: '', component: SwSpeciesListComponent },
      { path: ':id', component: SwSpeciesViewComponent },
    ],
  },
];
