import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlEventCreateFormComponent } from '../../../components/events/gl-event-create-form/gl-event-create-form.component';
import { EventService } from '../../../services/event.service';
import { EventInsertBody } from '../../../models/events';
import { Location } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-gl-event-create-page',
  imports: [GlEventCreateFormComponent],
  templateUrl: './gl-event-create-page.component.html',
  styleUrl: './gl-event-create-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlEventCreatePageComponent {
  private readonly service = inject(EventService);
  private readonly location = inject(Location);

  protected onFormSubmit(data: EventInsertBody): void {
    this.service.create(data).pipe(take(1)).subscribe(() => {
      this.location.back();
    });
  }

  protected onFormCancel(): void {
    this.location.back();
  }
}
