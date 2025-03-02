import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { parsePerson, resourceSignal } from '../../../helpers';
import { Person } from '../../../models';

@Component({
  selector: 'app-sw-person-view',
  imports: [DatePipe],
  templateUrl: './sw-person-view.component.html',
  styleUrl: './sw-person-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPersonViewComponent {
  readonly data = input.required<Person>();

  readonly parsedData = computed(() => {
    const parsedData = parsePerson(this.data());
    const { homeworld } = parsedData;

    return {
      ...parsedData,
      homeworld: resourceSignal(homeworld),
    } as const;
  });
}
