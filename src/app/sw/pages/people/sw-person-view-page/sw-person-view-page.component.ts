import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { SwPersonViewComponent } from '../../../components/people/sw-person-view/sw-person-view.component';
import { PeopleFetchService } from '../../../services/people-fetch.service';
import { PeopleHttpClientService } from '../../../services/people-http-client.service';


@Component({
  selector: 'app-sw-person-view-page',
  imports: [SwPersonViewComponent],
  templateUrl: './sw-person-view-page.component.html',
  styleUrl: './sw-person-view-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwPersonViewPageComponent {
  private readonly service = inject(PeopleHttpClientService);
  private readonly activatedRoute = inject(ActivatedRoute)

  private readonly params$ = this.activatedRoute.params

  protected data = toSignal(this.params$.pipe(
    map(({id})=> id as string),
    switchMap((id) => this.service.get(id)),
  ))
}
