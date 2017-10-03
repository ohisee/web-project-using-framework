export class User {
	constructor(
		private _email: string,
		private _password: string,
		private _firstName?: string,
		private _lastName?: string) { }

		get firstName(): string {
			return this._firstName;
		}

		get lastName(): string {
			return this._lastName;
		}

		get email(): string {
			return this._email;
		}

		get password(): string {
			return this._password;
		}

		/**
		 * To JSON object
		 */
		toObject() {
			return {
				'firstName': this.firstName,
				'lastName': this.lastName,
				'email': this.email,
				'password': this.password
			}
		}

}
