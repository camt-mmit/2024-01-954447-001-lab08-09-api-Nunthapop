import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { SwPeopleListComponent } from '../../../components/people/sw-people-list/sw-people-list.component';
import { SearchData } from '../../../models';
import { PeopleFetchService } from '../../../services/people-fetch.service';
import { createSwNavigateFn } from '../../helpers';

@Component({
  selector: 'app-sw-people-fetch-list-page',
  imports: [SwPeopleListComponent],
  templateUrl: './sw-people-fetch-list-page.component.html',
  styleUrl: './sw-people-fetch-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPeopleFetchListPageComponent {
  private readonly service = inject(PeopleFetchService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly queryParams$ = this.activatedRoute.queryParams;

  protected readonly isLoading = signal(true);

  protected readonly data = toSignal(
    this.queryParams$.pipe(
      switchMap(async (searchData) => {
        this.isLoading.set(true);
        const result = await this.service.getAll(searchData);
        this.isLoading.set(false);
        return result;
      }),
    ),
    { initialValue: undefined },
  );

  protected readonly searchData = toSignal(this.queryParams$, {
    initialValue: {},
  });

  private router = inject(Router);

  protected onSearch(searchData: SearchData): void {
    this.router.navigate([], {
      replaceUrl: true,
      queryParams: searchData,
    });
  }

  private readonly natigate = createSwNavigateFn();

  protected onSelect(id: string): void {
    this.natigate(id);
  }
}
