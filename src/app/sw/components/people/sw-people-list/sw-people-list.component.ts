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
import { parsePeopleList } from '../../../helpers';
import { Person, ResourcesList, SearchData } from '../../../models';

@Component({
  selector: 'app-sw-people-list',
  imports: [ReactiveFormsModule, LoadingComponent],
  templateUrl: './sw-people-list.component.html',
  styleUrl: './sw-people-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPeopleListComponent {
  readonly data = input.required<ResourcesList<Person> | undefined>();
  readonly searchData = input.required<SearchData>();
  readonly isLoading = input.required<boolean>();

  readonly searchDataChange = output<SearchData>();
  readonly itemSelect = output<string>();

  protected readonly parsedData = computed(
    () => (this.data() ? parsePeopleList(this.data()!) : undefined),
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
