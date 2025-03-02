import {
  computed,
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { SwMessageTemplate } from '../tokens';

interface SwNumberTemplateContext {
  $implicit: number;
}

@Directive({
  selector: '[appSwNumber]',
})
export class SwNumberDirective {
  // Narrow the type of the context using the generic type of the directive.
  static ngTemplateContextGuard(
    dir: SwNumberDirective,
    ctx: unknown,
  ): ctx is SwNumberTemplateContext {
    // As before the guard body is not used at runtime, and included only to avoid
    // TypeScript errors.
    return true;
  }

  readonly appSwNumberOf = input.required<string | number | null | undefined>();

  private numberValue = computed(() => {
    const value = this.appSwNumberOf();

    if (typeof value === 'undefined' || value === null) {
      return Number.NaN;
    } else if (typeof value === 'string' && value.trim() === '') {
      return Number.NaN;
    }

    return Number(
      typeof value === 'string' ? value.replaceAll(',', '') : value,
    );
  });

  private stringValue = computed(() => `${this.appSwNumberOf()}`);

  private isNumber = computed(() => !Number.isNaN(this.numberValue()));

  constructor() {
    const templateRef =
      inject<TemplateRef<SwNumberTemplateContext>>(TemplateRef);
    const viewContainerRef = inject(ViewContainerRef);
    const swMessageTemplate = inject(SwMessageTemplate);

    effect((onDestroy) => {
      viewContainerRef.clear();

      if (this.isNumber()) {
        const ref = viewContainerRef.createEmbeddedView(templateRef, {
          $implicit: this.numberValue(),
        });
        ref.detectChanges();
        onDestroy(() => ref.destroy());
      } else {
        const ref = viewContainerRef.createEmbeddedView(swMessageTemplate(), {
          $implicit: this.stringValue(),
        });
        ref.detectChanges();
        onDestroy(() => ref.destroy());
      }
    });
  }
}
