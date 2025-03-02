import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-sw-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './sw-page.component.html',
  styleUrl: './sw-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPageComponent {
  readonly activatedRoute = inject(ActivatedRoute);
}
