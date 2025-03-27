import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EventDateTime, EventInsertBody } from '../../../models/events';

@Component({
  selector: 'app-gl-event-create-form',
  imports: [ReactiveFormsModule],
  templateUrl: './gl-event-create-form.component.html',
  styleUrl: './gl-event-create-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlEventCreateFormComponent {
  readonly data = input<EventInsertBody>();

  readonly formSubmit = output<EventInsertBody>();
  readonly formCancel = output<void>();
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly formGroup = computed(() => {
    const fb = this.fb;
    const data = this.data();
    return this.fb.group({
      summary: fb.control(data?.summary ?? '', { updateOn: 'blur' }),
      description: fb.control(data?.description ?? '', { updateOn: 'blur' }),
      start: fb.group({
        dateTime: fb.control(
          (data?.start as EventDateTime | undefined)?.dateTime ?? '',
          { updateOn: 'blur' },
        ),
        timeZone: fb.control(Intl.DateTimeFormat().resolvedOptions().timeZone, {
          updateOn: 'blur',
        }),
      }),
      end: fb.group({
        dateTime: fb.control(
          (data?.end as EventDateTime | undefined)?.dateTime ?? '',
          { updateOn: 'blur' },
        ),
        timeZone: fb.control(Intl.DateTimeFormat().resolvedOptions().timeZone, {
          updateOn: 'blur',
        }),
      }),
    });
  });

  private normalizaDateTimeLocal(dateTimeLocal: string): string {
    const [date, time] = dateTimeLocal.split('T', 2);
    const times = time.split(':');

    while (times.length < 3) {
      times.push('00');
    }

    return `${date}T${times.join(':')}`;
  }

  protected onSubmit(): void {
    const data = this.formGroup().getRawValue();

    data.start.dateTime = this.normalizaDateTimeLocal(data.start.dateTime);
    data.end.dateTime = this.normalizaDateTimeLocal(data.end.dateTime);

    this.formSubmit.emit(data);
  }
}
