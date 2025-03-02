import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { SwMessageTemplate } from '../tokens';

interface SwResourceTemplateContext<T> {
  $implicit: NonNullable<T>;
}

@Directive({
  selector: '[appSwResource]',
})
export class SwResourceDirective<T> {
  // Narrow the type of the context using the generic type of the directive.
  static ngTemplateContextGuard<T>(
    dir: SwResourceDirective<T>,
    ctx: unknown,
  ): ctx is SwResourceTemplateContext<T> {
    // As before the guard body is not used at runtime, and included only to avoid
    // TypeScript errors.
    return true;
  }

  readonly appSwResourceOf = input.required<T>();
  readonly appSwResourceNullValue = input('-');

  constructor() {
    const templateRef =
      inject<TemplateRef<SwResourceTemplateContext<T>>>(TemplateRef);
    const viewContainerRef = inject(ViewContainerRef);
    const swMessageTemplate = inject(SwMessageTemplate);

    effect((onDestroy) => {
      const resource = this.appSwResourceOf();

      viewContainerRef.clear();

      if (typeof resource === 'undefined') {
        const ref = viewContainerRef.createComponent(LoadingComponent);
        ref.changeDetectorRef.detectChanges();
        onDestroy(() => ref.destroy());
      } else if (resource === null) {
        const ref = viewContainerRef.createEmbeddedView(swMessageTemplate(), {
          $implicit: this.appSwResourceNullValue(),
        });
        ref.detectChanges();
        onDestroy(() => ref.destroy());
      } else {
        const ref = viewContainerRef.createEmbeddedView(templateRef, {
          $implicit: resource,
        });
        ref.detectChanges();
        onDestroy(() => ref.destroy());
      }
    });
  }
}
