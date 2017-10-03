/**
 * Reactive form control
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	projectForm: FormGroup;
	projectStatusValues: any[] = [
		{
			'id': 'stable',
			'value': 'Stable'
		},
		{
			'id': 'critical',
			'value': 'Critical'
		},
		{
			'id': 'finished',
			'value': 'Finished'
		}
	];

	ngOnInit () {
		this.projectForm = new FormGroup({
			'projectName': new FormControl(null, [
				Validators.required,
				Validators.minLength(7),
				this.forbiddenProjectNamesCheck,
				CustomValidators.invalidProjectNamesCheck],
				CustomValidators.asyncInvalidProjectNamesCheck),
			'email': new FormControl(null, [
				Validators.required,
				Validators.email
			],
			this.forbiddenEmailsCheck),
			'projectStatus': new FormControl('critical')
		});
	}

	/**
	 * If validation is successful, must return null
	 */
	forbiddenProjectNamesCheck (control: FormControl): {[key: string]: boolean} | null {
		if ('Test' === control.value) {
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

	/**
	 * On Submit
	 */
	onSubmit(): void {
		console.log(this.projectForm);
		console.log(this.projectForm.controls['projectName'].value);
		console.log(this.projectForm.controls['email'].value);
		console.log(this.projectForm.controls['projectStatus'].value);
	}

}
