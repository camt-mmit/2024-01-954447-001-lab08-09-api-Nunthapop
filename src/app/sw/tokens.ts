import {
  Component,
  createComponent,
  DestroyRef,
  EnvironmentInjector,
  inject,
  InjectionToken,
  TemplateRef,
  viewChild,
} from '@angular/core';

interface SwMessageTemplateContext {
  $implicit: string;
}

@Component({
  template: `<ng-template let-message>{{ message }}</ng-template>`,
})
class SwMessageTemplateComponent {
  readonly templateRef =
    viewChild.required<TemplateRef<SwMessageTemplateContext>>(TemplateRef);
}

export const SwMessageTemplate = new InjectionToken<
  () => TemplateRef<SwMessageTemplateContext>
>('sw-message-template', {
  providedIn: 'root',
  factory: () => {
    const compRef = createComponent(SwMessageTemplateComponent, {
      environmentInjector: inject(EnvironmentInjector),
    });

    // NOTE: call detectChanges() after setInput() for executing effect().
    compRef.changeDetectorRef.detectChanges();

    return compRef.instance.templateRef;

    inject(DestroyRef).onDestroy(() => compRef.destroy());
  },
});
