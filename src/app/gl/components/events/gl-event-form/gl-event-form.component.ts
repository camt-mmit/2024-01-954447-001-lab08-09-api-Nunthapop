import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EventDateTime, EventInsertBody } from '../../../models/events';

@Component({
  selector: 'app-gl-event-form',
  imports: [ReactiveFormsModule],
  templateUrl: './gl-event-form.component.html',
  styleUrl: './gl-event-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlEventFormComponent {
  readonly data = input<EventInsertBody>();
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly formSubmit = output<EventInsertBody>();
  readonly formCancel = output<void>();

  private readonly fb = inject(FormBuilder).nonNullable;

  private readonly createFormGroup = (data?: EventInsertBody) =>
    this.fb.group({
      summary: this.fb.control(data?.summary ?? '', { updateOn: 'blur' }),
      description: this.fb.control(data?.description ?? '', {
        updateOn: 'blur',
      }),
      start: this.fb.group({
        dateTime: this.fb.control(
          (data?.start as EventDateTime | undefined)?.dateTime ?? '',
          { updateOn: 'blur' },
        ),
        timeZone: this.fb.control(
          Intl.DateTimeFormat().resolvedOptions().timeZone,
        ),
      }),
      end: this.fb.group({
        dateTime: this.fb.control(
          (data?.start as EventDateTime | undefined)?.dateTime ?? '',
          { updateOn: 'blur' },
        ),
        timeZone: this.fb.control(
          Intl.DateTimeFormat().resolvedOptions().timeZone,
        ),
      }),
    });

  protected readonly formGroup = computed(() =>
    this.createFormGroup(this.data()),
  );

  constructor() {
    effect(() => {
      if (this.disabled()) {
        if (this.formGroup().enabled) {
          this.formGroup().disable({ onlySelf: true });
        }
      } else {
        if (this.formGroup().disabled) {
          this.formGroup().enable({ onlySelf: true });
        }
      }
    });
  }

  private normalizeDateTimeLocal(dateTimeLocal: string): string {
    const [date, time] = dateTimeLocal.split('T');
    const times = time.split(':');

    while (times.length < 3) {
      times.push('00');
    }

    return `${date}T${times.join(':')}`;
  }

  protected onSubmit(): void {
    if (this.formGroup().valid) {
      const data = this.formGroup().getRawValue();

      data.start.dateTime = this.normalizeDateTimeLocal(data.start.dateTime);
      data.end.dateTime = this.normalizeDateTimeLocal(data.end.dateTime);

      this.formSubmit.emit(data);
    }
  }
}
