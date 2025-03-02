import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { OauthService } from '../../services/oauth.service';

const scopes = [
  'profile',
  'https://www.googleapis.com/auth/calendar.events',
] as const;

export interface GlState {
  intendedUrl: string;
}

@Component({
  selector: 'app-gl-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LoadingComponent],
  templateUrl: './gl-page.component.html',
  styleUrl: './gl-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlPageComponent {
  protected readonly oauthService = inject(OauthService);
  protected readonly router = inject(Router);

  protected readonly parsedIdToken = this.oauthService.computedParsedIdToken<{
    name?: string;
    picture: string;
  }>();

  protected async login(): Promise<void> {
    const authorizationUrl =
      await this.oauthService.getAuthorizationUrl<GlState>(scopes, {
        state: {
          intendedUrl: this.router.url,
        },

        // NOTE: The following 2 parameters, prompt and access_type,
        //       are required for getting the refresh_token.
        //       prompt=consent&access_type=offline
        additionalParams: {
          prompt: 'consent',
          access_type: 'offline',
        },
      });

    if (authorizationUrl) {
      location.href = `${authorizationUrl}`;
    }
  }

  protected async logout(): Promise<void> {
    await this.oauthService.clear();
  }
}
