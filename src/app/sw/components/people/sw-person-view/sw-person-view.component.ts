import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, resource } from '@angular/core';
import { Person, Resource } from '../../../models';
import { fetchResource, parsePerson, parseResource, readonlyArray, resourceSignal } from '../../../helpers';

@Component({
  selector: 'app-sw-person-view',
  imports: [DatePipe],
  templateUrl: './sw-person-view.component.html',
  styleUrl: './sw-person-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwPersonViewComponent {
readonly data = input.required<Person>();

  protected readonly parsedData = computed(()=>{
    const parsedData = parsePerson(this.data())
    const {homeworld,species, ...rest} = parsedData;

    return{
      ...rest,
      homeworld: resourceSignal(homeworld, parseResource),
      species: readonlyArray(species.map((value)=>resourceSignal(value, parseResource)),)
    };
  })


}
