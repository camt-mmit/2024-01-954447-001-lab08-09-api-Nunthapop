import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from '../../services/oauth.service';
import { GlState } from '../gl-page/gl-page.component';

@Component({
  selector: 'app-gl-authorization-page',
  imports: [],
  templateUrl: './gl-authorization-page.component.html',
  styleUrl: './gl-authorization-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlAuthorizationPageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly oauthService = inject(OauthService);

  readonly error = signal(
    (() => {
      const error: string | undefined =
        this.activatedRoute.snapshot.queryParams['error'];
      const error_description: string | undefined =
        this.activatedRoute.snapshot.queryParams['error_description'];

      return error || error_description ?
          { error, error_description }
        : undefined;
    })(),
  );

  constructor() {
    (async () => {
      const { code, state: stateToken } = this.activatedRoute.snapshot
        .queryParams as { code?: string; state?: string };

      if (code && stateToken) {
        try {
          const state =
            await this.oauthService.exchangeAuthorizationcode<GlState>(
              code,
              stateToken,
            );

          this.router.navigateByUrl(state.intendedUrl, {
            replaceUrl: true,
          });
        } catch (error) {
          if (error instanceof HttpErrorResponse) {
            this.error.set(error.error);
          } else if (error instanceof Error) {
            this.error.set({
              error: error.name,
              error_description: error.message,
            });
          }

          throw error;
        }
      } else {
        this.error.set({
          error: 'bad_response',
          error_description: `The response doesn't have 'code' or 'state'`,
        });
      }
    })();
  }
}
