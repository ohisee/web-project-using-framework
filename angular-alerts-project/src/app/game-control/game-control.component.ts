/**
 *
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-game-control',
	templateUrl: './game-control.component.html',
	styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

	@Output()
	gameStarted = new EventEmitter<{incrementCount: number}>();

	emitIntervalRef: any;
	count: number = 1;
	started: boolean;

	constructor() { }

	ngOnInit() {
		this.started = false;
	}

	/**
	 * To emit start game event
	 */
	onStartGame() {
		console.log("on start game called");
		this.emitIntervalRef =
			setInterval(() => {
				this.gameStarted.emit({
					incrementCount: this.count++
				})
			}, 1000);
		this.started = true;
	}

	onStopGame() {
		console.log("on stop game called");
		clearTimeout(this.emitIntervalRef);
		this.started = false;
	}

}
