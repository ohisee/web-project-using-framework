/**
 *
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-odd',
	template: `
		<p>Odd - {{ oddNumber }}</p>
	`,
	styles: [`
		p {
			color: rgb(155, 200, 123);
		}
	`]
})
export class OddComponent implements OnInit {

	@Input() oddNumber: number;

	constructor() { }

	ngOnInit() {
		console.log("Odd component on init called");
	}

}
