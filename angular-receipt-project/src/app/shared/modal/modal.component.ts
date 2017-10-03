import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

	displayBackGround: boolean = false;

  constructor() { }

  ngOnInit() { }

	/**
	 * @param trigger
	 */
	onDisplayBackGround(trigger: boolean) {
		this.displayBackGround = trigger;
	}

}
