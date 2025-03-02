import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { SwPeopleListComponent } from '../../../components/people/sw-people-list/sw-people-list.component';
import { SearchData } from '../../../models';
import { PeopleResourceService } from '../../../services/people-resource.service';
import { createSwNavigateFn } from '../../helpers';

@Component({
  selector: 'app-sw-people-resource-list-page',
  imports: [SwPeopleListComponent],
  templateUrl: './sw-people-resource-list-page.component.html',
  styleUrl: './sw-people-resource-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPeopleResourceListPageComponent {
  private readonly service = inject(PeopleResourceService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly queryParams$ = this.activatedRoute.queryParams;

  protected readonly searchData = toSignal(this.queryParams$, {
    initialValue: {},
  });

  protected readonly resource = this.service.getAll(this.searchData);

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
