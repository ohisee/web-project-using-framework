/**
 * This is authentication guard
 */
import { Injectable } from '@angular/core'
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

/* tslint:disable:indent */
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

	constructor(
		private authService: AuthService,
		private router: Router,
		private store: Store<fromApp.AppState>) { }

	/**
	 * Check can activate
	 * @param activeRoute
	 * @param state
	 * @return Observable boolean true or false
	 */
	canActivate(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.store.select('auth').take(1).map(
			(authState: fromAuth.State) => {
				this.authService.notAuthenticated$.next(authState.authenticated);
				return authState.authenticated && authState.token != null;
			}
		);
		// if (this.authService.isAuthenticated()) {
		// 	return true;
		// } else {
		// 	// this.router.navigate(['/']);
		// 	this.authService.notAuthenticated.next(true);
		// 	return false;
		// }
	}

	/**
	 * Check if can load
	 * @param route
	 * @return Observable
	 */
	canLoad(route: Route): Observable<boolean> {
		return this.store.select('auth').take(1).map(
			(authState: fromAuth.State) => {
				this.authService.notAuthenticated$.next(authState.authenticated);
				return authState.authenticated && authState.token != null;
			}
		);
		// if (this.authService.isAuthenticated()) {
		// 	return true;
		// } else {
		// 	// this.router.navigate(['/']);
		// 	this.authService.notAuthenticated$.next(true);
		// 	return false;
		// }
	}

}
