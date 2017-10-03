/**
 * This is structural directive
 */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

	/**
	 * Setter as property
	 */
	@Input() set appUnless (condition: boolean) {
		if (!condition) {
			this.viewContaninerRef.createEmbeddedView(this.templateRef);
		} else {
			this.viewContaninerRef.clear();
		}
	}

  constructor(private templateRef: TemplateRef<any>, private viewContaninerRef: ViewContainerRef) { }

}
