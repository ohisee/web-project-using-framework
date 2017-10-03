import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

	user1Activated: boolean = false;
	user2Activated: boolean = false;
	private myObservableSubscription: Subscription;

	constructor(private usersService: UsersService) { }

	/**
	 * This is Observable
	 */
	ngOnInit() {
		this.myObservableSubscription = this.usersService.userActivated.subscribe(
			(id: number) => {
				if (id === 1) {
					this.user1Activated = true;
				} else if (id === 2) {
					this.user2Activated = true;
				}
			}
		);
	}

	ngOnDestroy() {
		this.myObservableSubscription.unsubscribe();
		console.log("Unsubscribe event");
	}
}
