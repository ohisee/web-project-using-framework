import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

	private observeNumbersSubscription: Subscription
	private myObservableSubscription: Subscription

  constructor() { }

  ngOnInit() {
		const observeNumbers = Observable.interval(1000).map(
			(data: number) => {
				return data * 2;
			}
		);
		this.observeNumbersSubscription = observeNumbers.subscribe(
			(number: number) => {
				console.log(number);
			}
		)

		const myObservable = Observable.create(
			(observer: Observer<string>) => {
				setTimeout( () => {
					observer.next('first package')
				}, 2000);
				setTimeout( () => {
					observer.next('second package')
				}, 4000);
				setTimeout( () => {
					//observer.next('this does not work')
					observer.complete();
				}, 5000);
			}
		);
		this.myObservableSubscription = myObservable.subscribe(
			(data: string) => {
				console.log(data);
			},
			(error: string) => {
				console.log(error);
			},
			() => {
				console.log("completed");
			}
		)
  }

	ngOnDestroy() {
		this.observeNumbersSubscription.unsubscribe();
		this.myObservableSubscription.unsubscribe();
	}

}
