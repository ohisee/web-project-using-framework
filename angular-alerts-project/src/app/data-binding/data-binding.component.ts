/**
 * This is a Data Binding component.
 */
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-data-binding',
	templateUrl: './data-binding.component.html',
	styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

	userName: string = '';
	isButtonClickable: boolean = false;

	constructor() {}

	ngOnInit() {}

	onClickAddUserButton(){
		this.userName = '';
		this.isButtonClickable = false;
	}

	bindUsernameInput() {
		this.isButtonClickable = (this.userName === '' ? false : true);
	}

}
