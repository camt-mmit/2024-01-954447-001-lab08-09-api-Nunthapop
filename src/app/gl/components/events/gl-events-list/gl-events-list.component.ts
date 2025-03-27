import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  displayEventTimeRange,
  parseEventsList,
} from '../../../helpers/events';
import { EventsList, EventsQueryParams } from '../../../models/events';

function parseData(data: EventsList) {
  const parseData = parseEventsList(data);
  const { items, ...rest } = parseData;

  return {
    ...parseData,
    items: items.map((item) => ({
      ...item,
      displayDateTime: displayEventTimeRange(item),
    })),
  };
}

@Component({
  selector: 'app-gl-events-list',
  imports: [ReactiveFormsModule],
  templateUrl: './gl-events-list.component.html',
  styleUrl: './gl-events-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlEventsListComponent {
  readonly data = input.required<EventsList | undefined>();
  readonly queryParams = input<EventsQueryParams>({});
  readonly queryParamsChange = output<EventsQueryParams>();
  readonly reload = output<void>();

  protected readonly parseData = computed(() =>
    this.data() ? parseData(this.data()!) : undefined,
  );

  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly formGroup = computed(() =>
    this.fb.group({
      q: this.fb.control(this.queryParams().q ?? '', { updateOn: 'submit' }),
    }),
  );

  protected onSubmit(): void {
    this.queryParamsChange.emit(this.formGroup().getRawValue());
  }

  protected clear(): void {
    this.queryParamsChange.emit({});
  }
}
