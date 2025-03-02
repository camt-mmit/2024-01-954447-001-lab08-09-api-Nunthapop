import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { SwPlanetsListComponent } from '../../../components/planets/sw-planets-list/sw-planets-list.component';
import { SearchData } from '../../../models';
import { PlanetsService } from '../../../services/planets.service';
import { createSwNavigateFn } from '../../helpers';

@Component({
  selector: 'app-sw-planets-list-page',
  imports: [SwPlanetsListComponent],
  templateUrl: './sw-planets-list-page.component.html',
  styleUrl: './sw-planets-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPlanetsListPageComponent {
  private readonly service = inject(PlanetsService);
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
