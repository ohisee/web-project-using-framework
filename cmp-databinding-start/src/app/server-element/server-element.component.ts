/**
 * This is Server element component
 */
import {
	Component,
	OnInit,
	Input,
	ViewEncapsulation,
	OnChanges,
	DoCheck,
	AfterContentInit,
	AfterContentChecked,
	AfterViewInit,
	AfterViewChecked,
	OnDestroy,
	SimpleChanges,
	ViewChild,
	ElementRef,
	ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
	encapsulation: ViewEncapsulation.Emulated // None, Native
})
export class ServerElementComponent implements
	OnInit, OnChanges, DoCheck,
	AfterContentInit, AfterContentChecked,
	AfterViewInit, AfterViewChecked, OnDestroy {

	//Bind element as a property, exposing to HTML
	@Input('serverElement')
	element: {type: string, name: string, content: string};

	@ViewChild('heading') header: ElementRef;

	@ContentChild('contentParagraph') paragraph: ElementRef;

	constructor() {
		console.log('constructor called');
	}

	// Angular Life cycle,
	// ngOnChanges, called after a bound input property changes
	// ngOnInit, called once the component is initialized
	// ngDoCheck, called during every change detection run
	// ngAfterContentInit, called after content (ng-content) has been projected into view
	// ngAfterContentChecked, called every time the projected content has been checked
	// ngAfterViewInit, called after the component's view (and child views) has been initialized
	// ngAfterViewChecked, called every time the view (and child views) have been checked
	// ngOnDetroy, called once the component is about to be destroyed
	ngOnChanges(changes: SimpleChanges) {
		console.log('ngOnChanges called');
		console.log(changes);
	}

	ngDoCheck() {
		console.log("ngDoCheck called");
	}

	ngOnInit() {
		console.log('ngOnInit called');
		console.log('Text content: ' + this.header.nativeElement.textContent);
		console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
	}

	ngAfterContentInit() {
		console.log("ngAfterContentInit called");
		console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
	}

	ngAfterContentChecked() {
		console.log("ngAfterContentChecked called");
	}

	ngAfterViewInit() {
		console.log("ngAfterViewInit called");
		console.log('Text content ' + this.header.nativeElement.textContent);
	}

	ngAfterViewChecked() {
		console.log("ngAfterViewChecked called");
	}

	ngOnDestroy() {
		console.log("ngOnDetroy called");
	}

}
