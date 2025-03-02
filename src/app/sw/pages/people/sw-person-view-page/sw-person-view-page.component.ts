import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { SwPersonViewComponent } from '../../../components/people/sw-person-view/sw-person-view.component';
import { PeopleFetchService } from '../../../services/people-fetch.service';

@Component({
  selector: 'app-sw-person-view-page',
  imports: [SwPersonViewComponent],
  templateUrl: './sw-person-view-page.component.html',
  styleUrl: './sw-person-view-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPersonViewPageComponent {
  private readonly service = inject(PeopleFetchService);

  private readonly params$ = inject(ActivatedRoute).params;

  protected readonly data = toSignal(
    this.params$.pipe(switchMap(async ({ id }) => await this.service.get(id))),
    { initialValue: undefined },
  );

  protected back(): void {
    history.back();
  }
}
