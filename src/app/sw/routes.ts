import { Routes } from '@angular/router';
import { SwPlanetListComponent } from './components/planet/sw-planet-list/sw-planet-list.component';
import { SwPlanetViewComponent } from './components/planet/sw-planet-view/sw-planet-view.component';
import { SwSpeciesListComponent } from './components/species/sw-species-list/sw-species-list.component';
import { SwSpeciesViewComponent } from './components/species/sw-species-view/sw-species-view.component';
import { SwPeopleFetchListPageComponent } from './pages/people/sw-people-fetch-list-page/sw-people-fetch-list-page.component';
import { SwPeopleHttpClientListPageComponent } from './pages/people/sw-people-http-client-list-page/sw-people-http-client-list-page.component';
import { SwPeopleHttpResourceListPageComponent } from './pages/people/sw-people-http-resource-list-page/sw-people-http-resource-list-page.component';
import { SwPeoplePageComponent } from './pages/people/sw-people-page/sw-people-page.component';
import { SwPersonViewPageComponent } from './pages/people/sw-person-view-page/sw-person-view-page.component';
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
            path: 'resource-client',
            component: SwPeopleHttpResourceListPageComponent,
          },
          { path: ':id', component: SwPersonViewPageComponent },
        ],
      },
      {
        path: 'species',
        children: [
          { path: '', component: SwSpeciesListComponent },
          { path: ':id', component: SwSpeciesViewComponent },
        ],
      },
      {
        path: 'planets',
        children: [
          { path: '', component: SwPlanetListComponent },
          { path: ':id', component: SwPlanetViewComponent },
        ],
      },
    ],
  },
] as Routes;
