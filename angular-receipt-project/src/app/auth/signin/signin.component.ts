/**
 * Sign in form
 */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() { }

	/**
	 * @param sign in form
	 */
	onSignin(siginForm: NgForm) {
		const email = siginForm.value.email;
		const password = siginForm.value.password;
		//this.authService.signinUser(email, password);
		this.authService.signinUserUsingProvider();
	}

}
