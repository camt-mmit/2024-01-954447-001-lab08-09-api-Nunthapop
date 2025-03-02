import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sw-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './sw-page.component.html',
  styleUrl: './sw-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPageComponent {}
