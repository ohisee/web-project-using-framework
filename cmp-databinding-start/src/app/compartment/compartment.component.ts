/**
 * This is Compartment component
 */
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-compartment',
	templateUrl: './compartment.component.html',
	styleUrls: ['./compartment.component.css']
})
export class CompartmentComponent implements OnInit {

	@Output()
	serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();

	@Output()
	blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

	// Bind through ngModel newServerContent: string = '', newServerName: string = '';

	// Local reference through view child
	@ViewChild('serverContentInput') serverContentInput: ElementRef;

	constructor() { }

	// Angular Life cycle,
	// ngOnChanges, called after a bound input property changes
	// ngOnInit, called once the component is initialized
	// ngDoCheck, called during every change detection run
	// ngAfterContentInit, called after content (ng-content) has been projected into view
	// ngAfterContentChecked, called every time the projected content has been checked
	// ngAfterViewInit, called after the component's view (and child views) has been initialized
	// ngAfterViewChecked, called every time the view (and child views) have been checked
	// ngOnDetroy, called once the component is about to be destroyed
	ngOnInit() { }

	// serverNameInput Bind through local reference in HTML template
	// serverContentInput Local reference through view child, it is preferred not change its value
	onAddServer(serverNameInput: HTMLInputElement) {
		this.serverCreated.emit({
			serverName: serverNameInput.value,
			serverContent: this.serverContentInput.nativeElement.value
		});
	}

	// serverNameInput Bind through local reference in HTML template
	// serverContentInput Local reference throgh view child, it is preferred not change its value
	onAddBlueprint(serverNameInput: HTMLInputElement) {
		this.blueprintCreated.emit({
			serverName: serverNameInput.value,
			serverContent: this.serverContentInput.nativeElement.value
		});
	}

}
