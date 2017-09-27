/**
 * Sign in form
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../store/auth.reducers';
import * as AuthActions from '../store/auth.actions';

/* tslint:disable:indent */
@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

	readonly errormsg: string = 'We do not recognize this email and your credential';
	erred$: Observable<boolean>;
	// private subscription: Subscription;

	constructor(
		private authService: AuthService,
		private store: Store<fromApp.AppState>) { }

	ngOnInit() {
		this.erred$ = this.store.select('auth').map(
			(result: fromAuth.State) => {
				return !result.authenticated && result.errored;
			}
		);
	}

	/**
	 * Sign in
	 * this.authService.signinUser(email, password);
	 * this.authService.signinUserUsingProvider();
	 * @param {NgForm} siginForm
	 * @memberof SigninComponent
	 */
	onSignin(siginForm: NgForm) {
		console.log('onsignin');
		const email = siginForm.value.email;
		const password = siginForm.value.password;
		this.store.dispatch(new AuthActions.TrySignin({ username: email, password: password }));
	}

	/**
	 * if (this.subscription) {
	 * this.subscription.unsubscribe();
	 * }
	 */
	ngOnDestroy() {
		this.erred$.take(1);
		this.store.dispatch(new AuthActions.ClearErrorOnLeave());
	}

}
