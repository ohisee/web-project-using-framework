/**
 *
 */
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

export class CustomValidators {

	/**
	 * If validation is successful, must return null
	 */
	static invalidProjectNamesCheck(control: FormControl): {[key: string]: boolean} | null {
		if ('Test' === control.value) {
			return {'nameIsForbidden': true};
		} else {
			return null;
		}
	}

	/**
	 * If validation is successful, must return null
	 */
	static asyncInvalidProjectNamesCheck(control: FormControl): Promise<any> | Observable<any> {
		const promise = new Promise<any>(
			(resolve, reject) => {
				setTimeout(() => {
					if ('Test Project' === control.value) {
						resolve({'nameIsForbidden': true});
					} else {
						resolve(null);
					}
				}, 2000);
			}
		);
		return promise;
	}

}
