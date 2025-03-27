import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { GlEventsListComponent } from '../../../components/events/gl-events-list/gl-events-list.component';
import { EventsQueryParams } from '../../../models/events';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-gl-events-list-page',
  imports: [GlEventsListComponent, RouterLink, RouterLinkActive],
  templateUrl: './gl-events-list-page.component.html',
  styleUrl: './gl-events-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlEventsListPageComponent {
  protected service = inject(EventService);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly queryParams = toSignal(this.activatedRoute.queryParams, {
    initialValue: {},
  });

  protected readonly dataResource = this.service.getAll(this.queryParams);

  private readonly router = inject(Router);
  protected onQueryParamsChange(queryParams: EventsQueryParams): void {
    this.router.navigate([], {
      queryParams: queryParams,
      replaceUrl: true,
    });
  }
}
