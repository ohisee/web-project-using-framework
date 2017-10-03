import { Component } from '@angular/core';
import { animate, state, style, transition, trigger, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
	animations: [
		trigger('divState', [
			state('normal', style({
				'background-color': 'rgb(255, 0, 0)',
				'transform': 'translateX(0)'
			})),
			state('highlighted', style({
				'background-color': 'rgb(0, 0, 255)',
				'transform': 'translateX(100px)'
			})),
			transition('normal => highlighted', animate(300)), // number of miliseconds
			transition('highlighted => normal', animate(500))
			// OR transition('normal <=> highlighted', animate(300))
		]),
		trigger('wildState', [
			state('normal', style({
				'background-color': 'rgb(255, 0, 0)',
				'transform': 'translateX(0) scale(1)'
			})),
			state('highlighted', style({
				'background-color': 'rgb(0, 0, 255)',
				'transform': 'translateX(100px) scale(1)'
			})),
			state('shrunken', style({
				'background-color': 'rgb(0, 255, 0)',
				'transform': 'translateX(0) scale(0.5)'
			})),
			transition('normal => highlighted', animate(300)), // number of miliseconds
			transition('highlighted => normal', animate(800)),
			// transition('shrunken <=> *', animate(500, style({
			// 	'border-radius': '50px'
			// })))
			transition('shrunken <=> *', [
				style({
					'background-color': 'rgb(255, 102, 0)'
				}),
				animate(1000, style({
					'border-radius': '50px'
				})),
				animate(500)
			])
			// OR transition('normal <=> highlighted', animate(300))
		]),
		trigger('list1', [
			state('in', style({
				'opacity': '1',
				'transform': 'translateX(0)'
			})),
			transition('void => *', [
				style({
					'opacity': '0',
					'transform': 'translateX(-100px)'
				}),
				animate(300)
			]), // void state is at the beginning when state is added
			transition('* => void', [
				animate(300, style({
					'transform': 'translateX(100px)',
					'opacity': '0'
				}))
			]) // void state is at the beginning when state is added
		]),
		trigger('list2', [
			state('in', style({
				'opacity': '1',
				'transform': 'translateX(0)'
			})),
			transition('void => *', [
				animate(1000, keyframes([
					style({
						'transform': 'translateX(-100px)',
						'opacity': '0',
						'offset': '0'
					}),
					style({
						'transform': 'translateX(-50px)',
						'opacity': '0.5',
						'offset': '0.3'
					}),
					style({
						'transform': 'translateX(-20px)',
						'opacity': '1',
						'offset': '0.8'
					}),
					style({
						'transform': 'translateX(0px)',
						'opacity': '1',
						'offset': '1'
					})
				])) // control state
			]), // void state is at the beginning when state is added
			transition('* => void', [
				group([
					animate(300, style({
						'color': 'rgb(255, 0, 0)'
					})),
					animate(800, style({
						'transform': 'translateX(100px)',
						'opacity': '0'
					})),
				])
			]) // void state is at the beginning when state is added
		])
	]
})
export class AppComponent {

	state = 'normal';
	wildState = 'normal';
	list = ['Mike', 'Salt', 'Bread'];

	onAdd(item: string) {
		this.list.push(item);
	}

	onDelete(item: string) {
		this.list.splice(this.list.indexOf(item), 1);
	}

	onAnimate() {
		this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
		this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
	}

	onShrink() {
		this.wildState = 'shrunken';
	}

	animationStarted(event) {
		console.log(event);
	}

	animationCompleted(event) {
		console.log(event);
	}

}
