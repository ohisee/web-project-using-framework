import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
	signUpForm: FormGroup;
	private forbiddenUsernames: string[] = ['Chris', 'Anna'];
	errMsg = {
		'nameIsForbidden': 'This name is invalid!',
		'required': 'This field is required!'
	};

	/**
	 * Wrap 'username', 'email', 'gender' for future reference
	 */
	ngOnInit() {
		this.signUpForm = new FormGroup({
			'userData': new FormGroup({
				'username': new FormControl(null, [
					Validators.required,
					Validators.minLength(6),
					Validators.pattern('[a-zA-Z0-9]+'),
					this.forbiddenNamesCheck.bind(this)]), // only pass method reference, no need to pass Validators.required()
				'email': new FormControl(null, [
					Validators.required,
					Validators.email],
					this.forbiddenEmailsCheck), // only pass method reference
			}),
			'gender': new FormControl('male'),
			'hobbies': new FormArray([
				new FormControl('', Validators.required)
			])
		});
		this.signUpForm.valueChanges.subscribe(
			(value) => {
				console.log(value);
			}
		);
		this.signUpForm.statusChanges.subscribe(
			(status) => {
				console.log(status);
			}
		);
		this.signUpForm.setValue({
			'userData': {
				'username': 'administrator',
				'email': 'admin@yahoo.com'
			},
			'gender': 'male',
			'hobbies': ['sports']
		});
		// this.signUpForm.patchValue({
		// 	'userData': {
		// 		'username': 'administrator123',
		// 	},
		// 	'hobbies': [new FormControl('sports')]
		// });
		//this.signUpForm.get('hobbies').patchValue(['sports']);
	}

	onSubmit(): void {
		console.log(this.signUpForm);
		//this.signUpForm.reset();
	}

	onAddHobby(): void {
		const control = new FormControl(null, Validators.required);
		(<FormArray>this.signUpForm.get('hobbies')).push(control);
	}

	/**
	 * If validation is successful, must return null
	 */
	forbiddenNamesCheck(control: FormControl): {[key: string]: boolean} {
		if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
			return {'nameIsForbidden': true};
		} else {
			return null;
		}
	}

	/**
	 * If validation is successful, must return null
	 */
	forbiddenEmailsCheck(control: FormControl): Promise<any> | Observable<any> {
		const promise = new Promise<any>(
			(resolve, reject) => {
				setTimeout(() => {
					if (control.value === 'test@test.com') {
						resolve({'emailIsForbidden': true});
					} else {
						resolve(null);
					}
				}, 1500);
			}
		);
		return promise;
	}

}
