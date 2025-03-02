import { Directive } from '@angular/core';
import { createNavigateBackFn } from '../helpers/routes';

@Directive({
  selector: '[appNavigateBack]',
  host: {
    '(click)': 'onClick($event)',
  },
})
export class NavigateBackDirective {
  protected readonly onClick = createNavigateBackFn();
}
