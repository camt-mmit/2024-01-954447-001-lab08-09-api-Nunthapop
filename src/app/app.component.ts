import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  RoutesRecognized,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.app-st-hide-navigation]': 'hideNavigation()',
  },
})
export class AppComponent {
  title = 'week-08';

  protected readonly hideNavigation = signal(true);

  constructor() {
    const destroyRef = inject(DestroyRef);
    const router = inject(Router);

    const routesRecognizedSubscription = router.events
      .pipe(filter((event) => event instanceof RoutesRecognized))
      .subscribe((event) => {
        const { state } = event;

        let route = state.root;

        while (route.firstChild !== null) {
          route = route.firstChild;
        }

        this.hideNavigation.set(route.data['hideNavigation'] === true);
      });

    destroyRef.onDestroy(() => routesRecognizedSubscription.unsubscribe());
  }
}
