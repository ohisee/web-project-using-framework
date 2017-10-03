import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	@ViewChild('signUpForm') signUpForm: NgForm;
	defaultSubscription: string = 'Advanced';
	submitted: boolean = false;
	formData = {
		email: '',
		password: '',
		subscription: ''
	};
	subscriptions: string[] = ['Basic', 'Advanced', 'Pro'];

	onSubmit() {
		console.log(this.signUpForm);
		this.submitted = true;
		this.formData.email = this.signUpForm.value.userData.useremail;
		this.formData.password = this.signUpForm.value.userData.userpassword;
		this.formData.subscription = this.signUpForm.value.userData.usersubscription;
		console.log(this.formData);
		this.signUpForm.reset();
	}

}
