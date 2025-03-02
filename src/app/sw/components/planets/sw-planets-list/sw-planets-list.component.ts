import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { SwNumberDirective } from '../../../directives/sw-number.directive';
import { parsePlanetsList } from '../../../helpers';
import { Planet, ResourcesList, SearchData } from '../../../models';

@Component({
  selector: 'app-sw-planets-list',
  imports: [
    ReactiveFormsModule,
    DecimalPipe,
    LoadingComponent,
    SwNumberDirective,
  ],
  templateUrl: './sw-planets-list.component.html',
  styleUrl: './sw-planets-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPlanetsListComponent {
  readonly data = input.required<ResourcesList<Planet> | undefined>();
  readonly searchData = input.required<SearchData>();
  readonly isLoading = input.required<boolean>();

  readonly searchDataChange = output<SearchData>();
  readonly itemSelect = output<string>();

  protected readonly parsedData = computed(
    () => (this.data() ? parsePlanetsList(this.data()!) : undefined),
    {
      equal: (pre, next) => typeof next === 'undefined' || Object.is(pre, next),
    },
  );

  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly formGroup = computed(() =>
    this.fb.group({
      search: this.fb.control(this.searchData().search ?? '', {
        updateOn: 'submit',
      }),
    }),
  );

  protected select(id: string): void {
    if (id) {
      this.itemSelect.emit(id);
    }
  }

  protected onSubmit(): void {
    this.searchDataChange.emit(this.formGroup().getRawValue());
  }

  protected clear(): void {
    this.searchDataChange.emit({});
  }

  protected goto(url: URL | null): void {
    if (url) {
      this.searchDataChange.emit(Object.fromEntries(url.searchParams));
    }
  }
}
