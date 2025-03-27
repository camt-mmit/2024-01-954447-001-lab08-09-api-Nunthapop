import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Person, ResourceList, SearchData } from '../../../models';
import { SwPeopleListComponent } from "../../../components/people/sw-people-list/sw-people-list.component";
import { AsyncPipe } from '@angular/common';
import { PeopleFetchService } from '../../../services/people-fetch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-sw-people-fetch-list-page',
  imports: [SwPeopleListComponent],
  templateUrl: './sw-people-fetch-list-page.component.html',
  styleUrl: './sw-people-fetch-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwPeopleFetchListPageComponent {
  private readonly service = inject(PeopleFetchService)
  private readonly activatedRoute = inject(ActivatedRoute)

  protected readonly isLoading = signal(false)
  private readonly queryParams$ = this.activatedRoute.queryParams;



  protected readonly data = toSignal(this.queryParams$.pipe(
    tap(()=>this.isLoading.set(true)),
    switchMap(async (searchData) => await this.service.getAll(searchData)),
    tap(()=>this.isLoading.set(false))

  ));

  protected readonly searchData = toSignal(this.queryParams$, {initialValue: {}})

  private readonly router = inject(Router);

  protected search(searchData: SearchData): void{
    this.router.navigate([], {
      queryParams: searchData,
      replaceUrl: true,
    });
  }

  protected onItemSelect(id: string):void {
    const path = id.split('/').pop();
    this.router.navigate(['..',path],{
      relativeTo: this.activatedRoute,
    })
  }
}
