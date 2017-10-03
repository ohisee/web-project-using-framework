/**
 * This is attribute directive
 */
import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
	selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

	// Bind color from outside
	@Input() defaultColor: string = 'transparent';
	@Input('appBetterHighlight') highLightColor: string = 'blue';

	// access DOM element's property
	@HostBinding('style.backgroundColor') backgroundColor: string;
	@HostBinding('style.fontSize') fontSize: string;

	constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

	ngOnInit() {
		this.backgroundColor = this.defaultColor;
		//this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
	}

	@HostListener('mouseenter') mouseOver(eventData: Event) {
		//this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
		//this.backgroundColor = 'blue';
		this.backgroundColor = this.highLightColor;
		this.fontSize = 'medium';
	}

	@HostListener('mouseleave') mouseLeave(eventData: Event) {
		//this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
		//this.backgroundColor = 'transparent';
		this.backgroundColor = this.defaultColor;
		this.fontSize = 'x-large';
	}

}
