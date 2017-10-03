/**
 * Sign up form
 */
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
	//providers:[AuthService]
})
export class SignupComponent implements OnInit, OnDestroy {

	@ViewChild('signupForm') signupForm: NgForm;
	signUpErr: string = '';
	signUpErred: boolean = false;
	private subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() { }

	/**
	 * @param sign up form
	 */
	onSignup(signupForm: NgForm) {
		const email = signupForm.value.email;
		const password = signupForm.value.password;
		this.authService.signupUser(email, password);
		this.subscription = this.authService.signupErred.subscribe(
			(erred: boolean) => {
				if (erred) {
					this.signUpErred = erred;
					this.signUpErr = 'Unable to Sign Up';
				}
			}
		);
	}

	/**
	 * Clear the subscription
	 */
	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

}
