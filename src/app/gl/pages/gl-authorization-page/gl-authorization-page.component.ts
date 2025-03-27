import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from '../../services/oauth.service';
import { Glpage } from '../gl-page/gl-page.component';

@Component({
  selector: 'app-gl-authorization-page',
  imports: [],
  templateUrl: './gl-authorization-page.component.html',
  styleUrl: './gl-authorization-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlAuthorizationPageComponent {
  constructor() {
    const activatedRoute = inject(ActivatedRoute);
    const router = inject(Router);
    const authorizationCode = activatedRoute.snapshot.queryParams[
      'code'
    ] as string | undefined;

    const stateToken = activatedRoute.snapshot.queryParams['state'] as
      | string
      | undefined;

    const oauthService = inject(OauthService);

    (async () => {
      if (authorizationCode && stateToken) {
        const state = await oauthService.exchangeAuthorizationCode<Glpage>(
          authorizationCode,
          stateToken,
        );

        router.navigateByUrl(state.intentedUrl);

      }
    })();
  }
}
