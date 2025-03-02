import { Routes } from '@angular/router';
import { SwPeopleFetchListPageComponent } from './pages/people/sw-people-fetch-list-page/sw-people-fetch-list-page.component';
import { SwPeopleHttpClientListPageComponent } from './pages/people/sw-people-http-client-list-page/sw-people-http-client-list-page.component';
import { SwPeoplePageComponent } from './pages/people/sw-people-page/sw-people-page.component';
import { SwPeopleResourceListPageComponent } from './pages/people/sw-people-resource-list-page/sw-people-resource-list-page.component';
import { SwPersonViewPageComponent } from './pages/people/sw-person-view-page/sw-person-view-page.component';
import { SwPlanetViewPageComponent } from './pages/planets/sw-planet-view-page/sw-planet-view-page.component';
import { SwPlanetsListPageComponent } from './pages/planets/sw-planets-list-page/sw-planets-list-page.component';
import { SwSpeciesListPageComponent } from './pages/species/sw-species-list-page/sw-species-list-page.component';
import { SwSpeciesViewPageComponent } from './pages/species/sw-species-view-page/sw-species-view-page.component';
import { SwPageComponent } from './pages/sw-page/sw-page.component';

export default [
  {
    path: '',
    component: SwPageComponent,
    children: [
      { path: '', redirectTo: 'people', pathMatch: 'full' },

      {
        path: 'people',
        component: SwPeoplePageComponent,
        children: [
          { path: '', redirectTo: 'fetch', pathMatch: 'full' },

          { path: 'fetch', component: SwPeopleFetchListPageComponent },
          {
            path: 'http-client',
            component: SwPeopleHttpClientListPageComponent,
          },
          {
            path: 'resource',
            component: SwPeopleResourceListPageComponent,
          },
          { path: ':id', component: SwPersonViewPageComponent },
        ],
      },

      {
        path: 'species',
        children: [
          { path: '', component: SwSpeciesListPageComponent },
          { path: ':id', component: SwSpeciesViewPageComponent },
        ],
      },

      {
        path: 'planets',
        children: [
          { path: '', component: SwPlanetsListPageComponent },
          { path: ':id', component: SwPlanetViewPageComponent },
        ],
      },
    ],
  },
] as Routes;
