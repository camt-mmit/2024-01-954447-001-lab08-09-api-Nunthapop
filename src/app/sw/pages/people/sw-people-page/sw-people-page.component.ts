import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sw-people-page',
  imports: [RouterLink,RouterOutlet,RouterLink],
  templateUrl: './sw-people-page.component.html',
  styleUrl: './sw-people-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwPeoplePageComponent {

}
