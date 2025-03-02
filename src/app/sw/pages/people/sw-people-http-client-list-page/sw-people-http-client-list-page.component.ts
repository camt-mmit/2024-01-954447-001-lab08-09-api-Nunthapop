import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { SwPeopleListComponent } from '../../../components/people/sw-people-list/sw-people-list.component';
import { SearchData } from '../../../models';
import { PeopleHttpClientService } from '../../../services/people-http-client.service';

@Component({
  selector: 'app-sw-people-http-client-list-page',
  imports: [SwPeopleListComponent],
  templateUrl: './sw-people-http-client-list-page.component.html',
  styleUrl: './sw-people-http-client-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPeopleHttpClientListPageComponent {
  private readonly service = inject(PeopleHttpClientService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly queryParams$ = this.activatedRoute.queryParams;

  protected readonly isLoading = signal(true);

  protected readonly data = toSignal(
    this.queryParams$.pipe(
      tap(() => this.isLoading.set(true)),
      switchMap((searchData) => this.service.getAll(searchData)),
      tap(() => this.isLoading.set(false)),
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

  protected onSelect(id: string): void {
    const idNumber = new URL(id).pathname
      .split('/')
      .reverse()
      .find((path) => path !== '');

    this.router.navigate(['..', idNumber], {
      relativeTo: this.activatedRoute,
    });
  }
}
