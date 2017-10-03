/**
 * This is authentication service
 */
import { Injectable } from '@angular/core';
import { Response, Jsonp, RequestMethod, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

	private userToken: string;
	private userAccessToken: string;
	signupErred = new Subject<boolean>();
	notAuthenticated = new Subject<boolean>();
	storageKey: string = 'curruserref';

	constructor(private router: Router, private jsonp: Jsonp) { }

	/**
	 * Sign up @param email @param password
	 */
	signupUser(email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password).then(
			(response) => {
				this.emailVerifyUser();
			}
		).catch(
			(error) => {
				//console.log(error.message);
				this.signupErred.next(true);
			}
		);
	}

	/**
	 * Verify user by email
	 */
	emailVerifyUser() {
		const user = firebase.auth().currentUser;
		if (user != null) {
			user.sendEmailVerification().then(
				(response) => {
					console.log(response);
				}
			).catch(
				(error) => {
					console.log(error);
				}
			);
		}
	}

	/**
	 * Verify user
	 */
	allowUserAccess(): boolean {
		const user = firebase.auth().currentUser;
		if (user != null) {
			return user.emailVerified;
		}
		return false;
	}

	/**
	 * Sign in @param email @param password
	 */
	signinUser(email: string, password: string) {
		firebase.auth().signInWithEmailAndPassword(email, password).then(
			(result) => {
				if (this.allowUserAccess()) {
					firebase.auth().currentUser.getToken().then(
						(token: string) => {
							this.userToken = token;
							this.storeUserTokenInStorage(token);
						}
					);
					this.router.navigate(['/']);
				}
			}
		).catch(
			(error) => {
				console.log(error);
			}
		);
	}

	/**
	 * Sign in using a provider
	 */
	signinUserUsingProvider() {
		const provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/plus.login');
		firebase.auth().signInWithPopup(provider).then(
			(result) => {
				//console.log(result.credential.accessToken);
				this.userAccessToken = result.credential.accessToken;
				firebase.auth().currentUser.getToken().then(
					(token: string) => {
						this.userToken = token;
						this.storeUserTokenInStorage(token);
					}
				)
				this.router.navigate(['/']);
			}
		).catch(
			(error) => {
				console.log(error);
			}
		);
	}

	/**
	 * Get user token
	 */
	getToken() {
		const user = firebase.auth().currentUser;
		if (user != null) {
			user.getToken().then(
				(token: string) => {
					this.userToken = token;
				}
			)
			return this.userToken;
		}
		return this.getUserTokenFromStorage();
	}

	/**
	 * @return true of false
	 */
	isAuthenticated(): boolean {
		const user = firebase.auth().currentUser;
		if (this.getUserTokenFromStorage() != null) {
			return true;
		} else if (user != null && this.userToken != null) {
			return true;
		}
		return false;
	}

	/**
	 * This is to sign out
	 * const cred = firebase.auth.GoogleAuthProvider.credential(null, this.userAccessToken);
	 * firebase.auth().currentUser.reauthenticateWithCredential(cred);
	 */
	signOut() {
		firebase.auth().signOut();
		this.userToken = null;
		this.removeUserTokenFromStorage();
		this.jsonp.request('https://accounts.google.com/Logout', {
			method: RequestMethod.Get,
			headers: new Headers({
				'Accept': 'text/html'
			})
		}).subscribe(
			(result) => {
				console.log(result);
			},
			(error) => {
				console.log(error);
			}
		);
		this.router.navigate(['/']);
	}

	private storageSupported(): boolean {
		try {
			return 'sessionStorage' in window && window['sessionStorage'] !== null;
		} catch (exception) {
			return false;
		}
	}

	private storeUserTokenInStorage(token: string) {
		if (this.storageSupported()) {
			sessionStorage.setItem(this.storageKey, token);
		}
	}

	private getUserTokenFromStorage() {
		if (this.storageSupported()) {
			return sessionStorage.getItem(this.storageKey);
		} else {
			return null;
		}
	}

	private removeUserTokenFromStorage() {
		if (this.storageSupported()) {
			sessionStorage.removeItem(this.storageKey);
		}
	}

}
