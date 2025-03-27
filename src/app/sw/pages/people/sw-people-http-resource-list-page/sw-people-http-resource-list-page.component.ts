import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PeopleResourceService } from '../../../services/people-resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { SearchData } from '../../../models';
import { SwPeopleListComponent } from '../../../components/people/sw-people-list/sw-people-list.component';

@Component({
  selector: 'app-sw-people-http-resource-list-page',
  imports: [SwPeopleListComponent],
  templateUrl: './sw-people-http-resource-list-page.component.html',
  styleUrl: './sw-people-http-resource-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwPeopleHttpResourceListPageComponent {
private readonly service = inject(PeopleResourceService)
  private readonly activatedRoute = inject(ActivatedRoute)

  private readonly queryParams$ = this.activatedRoute.queryParams;

  protected readonly searchData = toSignal(this.queryParams$, {initialValue: {}})

  protected readonly resource = this.service.getAll(this.searchData)



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

