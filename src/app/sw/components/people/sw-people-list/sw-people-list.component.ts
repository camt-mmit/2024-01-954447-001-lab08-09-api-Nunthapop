import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Person, ResourceList, SearchData } from '../../../models';
import { parsePersonList } from '../../../helpers';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sw-people-list',
  imports: [ReactiveFormsModule],
  templateUrl: './sw-people-list.component.html',
  styleUrl: './sw-people-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwPeopleListComponent {
  readonly data = input.required<ResourceList<Person>>();
  readonly isLoading = input(false)
  readonly searchData = input.required<SearchData>();


  readonly searchDataChange = output<SearchData>();
  readonly itemSelect = output<string>();


  protected parsedData = computed(() => parsePersonList(this.data()))

  private readonly fb = inject(FormBuilder).nonNullable;

  protected formGroup = computed(()=> this.fb.group({
    search: this.fb.control(this.searchData().search ?? '',{updateOn:'submit'}),
  }),);

  protected onSubmit(): void {
    this.searchDataChange.emit(this.formGroup().getRawValue());
  }

  protected onPage(url: URL | null): void{

    if(url){
      this.searchDataChange.emit(Object.fromEntries(url.searchParams))
    }

  }

  protected clear(): void{
    this.searchDataChange.emit({});
  }
}
