import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GlEventsListComponent } from '../../../components/events/gl-events-list/gl-events-list.component';
import { EventsQueryParams } from '../../../models/events';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-gl-events-list-page',
  imports: [RouterLink, GlEventsListComponent],
  templateUrl: './gl-events-list-page.component.html',
  styleUrl: './gl-events-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlEventsListPageComponent {
  private readonly service = inject(EventsService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly queryParams$ = this.activatedRoute.queryParams;

  protected readonly queryParams = toSignal(this.queryParams$, {
    initialValue: {},
  });

  protected readonly resource = this.service.getAll(this.queryParams);

  private router = inject(Router);

  protected onQuery(queryParams: EventsQueryParams): void {
    this.router.navigate([], {
      replaceUrl: true,
      queryParams,
    });
  }
}
