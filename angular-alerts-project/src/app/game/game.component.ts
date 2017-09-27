/**
 *
 */
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

	incrementCount: number = 0;

	constructor() { }

	ngOnInit() { }

	/**
	 * To capture increment count
	 */
	onGameStarted(incrementCount: {incrementCount: number}) {
		console.log("on game started: " + incrementCount.incrementCount);
		this.incrementCount = incrementCount.incrementCount;
	}

}
