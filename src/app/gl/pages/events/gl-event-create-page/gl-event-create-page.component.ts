import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { createNavigateBackFn } from '../../../../shared/helpers/routes';
import { GlEventFormComponent } from '../../../components/events/gl-event-form/gl-event-form.component';
import { EventInsertBody } from '../../../models/events';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-gl-event-create-page',
  imports: [GlEventFormComponent],
  templateUrl: './gl-event-create-page.component.html',
  styleUrl: './gl-event-create-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlEventCreatePageComponent {
  private readonly service = inject(EventsService);

  protected readonly disabled = signal(false);

  private readonly location = inject(Location);

  private readonly navigationBack = createNavigateBackFn();

  protected onFormSubmit(data: EventInsertBody): void {
    this.disabled.set(true);

    this.service
      .create(data)
      .pipe(take(1))
      .subscribe({
        complete: () => this.navigationBack(),
        error: () => this.disabled.set(false),
      });
  }

  private readonly router = inject(Router);

  protected onFormCancel(): void {
    this.navigationBack();
  }
}
