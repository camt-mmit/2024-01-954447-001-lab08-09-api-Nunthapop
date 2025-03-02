import { DatePipe, DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { SwNumberDirective } from '../../../directives/sw-number.directive';
import { SwResourceDirective } from '../../../directives/sw-resource.directive';
import {
  parsePerson,
  parsePlanet,
  parseSpecies,
  readonlyArray,
  resourceSignal,
} from '../../../helpers';
import { Species } from '../../../models';

@Component({
  selector: 'app-sw-species-view',
  imports: [DatePipe, DecimalPipe, SwResourceDirective, SwNumberDirective],
  templateUrl: './sw-species-view.component.html',
  styleUrl: './sw-species-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwSpeciesViewComponent {
  readonly data = input.required<Species>();

  readonly linkClick = output<string>();

  readonly parsedData = computed(() => {
    const { homeworld, people, ...rest } = parseSpecies(this.data());

    return {
      ...rest,
      homeworld: resourceSignal(homeworld, parsePlanet),
      people: readonlyArray(
        people.map((url) => resourceSignal(url, parsePerson)),
      ),
    } as const;
  });

  readonly normalizedName = computed(() =>
    this.parsedData()
      .name.replaceAll(/[\s']+/g, '-')
      .toLocaleLowerCase(),
  );

  protected onLinkClick(id: string | undefined): void {
    if (id) {
      this.linkClick.emit(id);
    }
  }
}
