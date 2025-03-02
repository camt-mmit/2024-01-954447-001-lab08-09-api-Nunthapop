import { isDevMode } from '@angular/core';
import { Routes } from '@angular/router';
import { GlEventCreatePageComponent } from './pages/events/gl-event-create-page/gl-event-create-page.component';
import { GlEventsListPageComponent } from './pages/events/gl-events-list-page/gl-events-list-page.component';
import { GlAuthorizationPageComponent } from './pages/gl-authorization-page/gl-authorization-page.component';
import { GlPageComponent } from './pages/gl-page/gl-page.component';
import { EventsService } from './services/events.service';
import { provideOauth } from './services/oauth.service';

export default [
  {
    path: '',
    providers: [
      provideOauth({
        name: 'google',
        clientId:
          '209689905225-dj1bo29m0c7or5926cv4bb1nu5aru0cv.apps.googleusercontent.com',
        clientSecret: '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',
        authorizationCodeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        accessTokenUrl: 'https://oauth2.googleapis.com/token',
        redirectUri:
          isDevMode() ?
            'http://localhost:4200/google/authorization'
          : 'https://camt-mmit.github.io/2024-01-954447-001-lab08-09-api-mrpachara/google/authorization',
      }),
    ],
    children: [
      {
        path: 'authorization',
        data: { hideNavigation: true },
        component: GlAuthorizationPageComponent,
      },

      {
        path: '',
        component: GlPageComponent,
        children: [
          { path: '', redirectTo: 'events', pathMatch: 'full' },

          {
            path: 'events',
            providers: [EventsService],
            children: [
              { path: '', component: GlEventsListPageComponent },
              { path: 'create', component: GlEventCreatePageComponent },
            ],
          },
        ],
      },
    ],
  },
] as Routes;
