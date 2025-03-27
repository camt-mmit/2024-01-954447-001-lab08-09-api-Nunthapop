import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PeopleHttpClientService } from '../../../services/people-http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchData } from '../../../models';
import { SwPeopleListComponent } from '../../../components/people/sw-people-list/sw-people-list.component';

@Component({
  selector: 'app-sw-people-http-client-list-page',
  imports: [SwPeopleListComponent],
  templateUrl: './sw-people-http-client-list-page.component.html',
  styleUrl: './sw-people-http-client-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwPeopleHttpClientListPageComponent {
  private readonly service = inject(PeopleHttpClientService)
  private readonly activatedRoute = inject(ActivatedRoute)

  protected readonly isLoading = signal(false)
  private readonly queryParams$ = this.activatedRoute.queryParams;



  protected readonly data = toSignal(this.queryParams$.pipe(
    tap(()=>this.isLoading.set(true)),
    switchMap( (searchData) =>  this.service.getAll(searchData)),
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
