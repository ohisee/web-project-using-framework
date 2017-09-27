/**
 *
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-even',
	template: `
		<p>Even - {{ evenNumber }}</p>
	`,
	styles: [`
		p {
			color: rgb(190, 100, 100);
		}
	`]
})
export class EvenComponent implements OnInit {

	@Input() evenNumber: number;

	constructor() { }

	ngOnInit() {
		console.log('Event component on init called');
	}

}
