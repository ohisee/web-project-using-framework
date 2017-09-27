/**
 * Sign up form
 */
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
	// providers:[AuthService]
})
export class SignupComponent implements OnInit, OnDestroy {

	@ViewChild('signupForm') signupForm: NgForm;
	readonly signUpErr: string = 'Unable to Sign Up';
	erred$: Observable<boolean>;
	private subscription: Subscription;

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
	 * Sign up
	 * this.authService.signupUser(email, password);
	 * this.subscription = this.authService.signupErred.subscribe(
	 * (erred: boolean) => {
	 * if (erred) {
	 * this.signUpErred = erred;
	 * this.signUpErr = 'Unable to Sign Up';
	 * }
	 * }
	 * );
	 * @param {NgForm} signupForm
	 * @memberof SignupComponent
	 */
	onSignup(signupForm: NgForm) {
		const email = signupForm.value.email;
		const password = signupForm.value.password;
		this.store.dispatch(new AuthActions.TrySignup({ username: email, password: password }));
	}

	/**
	 * Clear the subscription
	 */
	ngOnDestroy() {
		this.erred$.take(1);
	}

}
