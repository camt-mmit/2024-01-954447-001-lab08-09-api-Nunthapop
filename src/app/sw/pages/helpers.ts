import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SwPageComponent } from './sw-page/sw-page.component';

export function createSwNavigateFn() {
  const moduleRootRoute = inject(SwPageComponent).activatedRoute;
  const router = inject(Router);

  return (id: string) => {
    const [, pathnanme] = id.split(':', 2);
    const navigates = pathnanme.split('/');

    router.navigate(navigates, {
      relativeTo: moduleRootRoute,
    });
  };
}
