import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { SwSpeciesListComponent } from '../../../components/species/sw-species-list/sw-species-list.component';
import { SearchData } from '../../../models';
import { SpeciesService } from '../../../services/species.service';
import { createSwNavigateFn } from '../../helpers';

@Component({
  selector: 'app-sw-species-list-page',
  imports: [SwSpeciesListComponent],
  templateUrl: './sw-species-list-page.component.html',
  styleUrl: './sw-species-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwSpeciesListPageComponent {
  private readonly service = inject(SpeciesService);
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
