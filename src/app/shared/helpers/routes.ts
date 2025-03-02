import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare const navigation: {
  back: () => void;
  canGoBack: boolean;
};

export function createNavigateBackFn(): (event?: Event) => void {
  const location = inject(Location);
  const router = inject(Router);
  const activatedRoute = inject(ActivatedRoute);

  return (event?: Event) => {
    event?.preventDefault();

    if (typeof navigation !== 'undefined') {
      if (navigation.canGoBack) {
        navigation.back();
      } else {
        router.navigate(['..'], {
          replaceUrl: true,
          relativeTo: activatedRoute,
        });
      }
    } else {
      location.back();
    }
  };
}
