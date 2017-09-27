/**
 *
 */
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-directives',
	templateUrl: './directives.component.html',
	styles: [`
		.logTextColor {
			color: #FFFFFF;
		}
	`]
})
export class DirectivesComponent implements OnInit {

	buttonNameValue: string = '';
	displayDetails: boolean = false;
	buttonClickLogs: string[] = [];
	buttonClickCount: number = 0;

	constructor() {
		this.buttonNameValue = 'Display Details';
	}

	ngOnInit() {}

	onClickDisplayDetails() {
		this.buttonNameValue =
			(this.displayDetails == true) ? 'Display Details' : 'Hide Details';
		this.displayDetails = !this.displayDetails;
		this.buttonClickLogs.push("Clicked at " + (new Date()).toISOString());
	}

}
