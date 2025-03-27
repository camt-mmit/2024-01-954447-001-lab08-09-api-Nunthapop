import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { OauthService } from '../../services/oauth.service';

export interface Glpage {
  intentedUrl: string;
}

const scope = [
  'profile',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/contacts',
];

@Component({
  selector: 'app-gl-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './gl-page.component.html',
  styleUrl: './gl-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlPageComponent {
  protected readonly oauthService = inject(OauthService);
  protected readonly routerOutlet = inject(Router);

  protected async authorize(): Promise<void> {
    const url = await this.oauthService.getAuthorizationCodeUrl(scope, {
      additionalParam: {
        prompt: 'consent',
        access_type: 'offline',
      },
      state: {
        intentedUrl: this.routerOutlet.url,
      },
    });

    if (url) {
      location.href = `${url}`;
    }
  }
}
