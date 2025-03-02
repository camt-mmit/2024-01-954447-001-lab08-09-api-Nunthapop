import { Routes } from '@angular/router';
import { SwPeopleFetchListPageComponent } from './pages/people/sw-people-fetch-list-page/sw-people-fetch-list-page.component';
import { SwPeopleHttpClientListPageComponent } from './pages/people/sw-people-http-client-list-page/sw-people-http-client-list-page.component';
import { SwPeoplePageComponent } from './pages/people/sw-people-page/sw-people-page.component';
import { SwPeopleResourceListPageComponent } from './pages/people/sw-people-resource-list-page/sw-people-resource-list-page.component';
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
            path: 'resource',
            component: SwPeopleResourceListPageComponent,
          },
          { path: ':id', component: SwPersonViewPageComponent },
        ],
      },
    ],
  },
] as Routes;
