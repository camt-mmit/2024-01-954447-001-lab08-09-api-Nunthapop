import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.---appear-delay]': 'apperDelay()',
  },
})
export class LoadingComponent {
  readonly delay = input(0, { transform: numberAttribute });

  readonly apperDelay = computed(() => `${this.delay() / 1_000}s`);
}
