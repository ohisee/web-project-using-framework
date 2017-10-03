/**
 * Auth Guard
 */
import { Injectable } from '@angular/core'
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		activeRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

		return this.authService.isAuthenticated().then(
			(authenticated: boolean) => {
				if (authenticated) {
					return true;
				} else {
					this.router.navigate(['/']);
					return false;
				}
			}
		);
	}

	canActivateChild(
		activeRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.canActivate(activeRoute, state);
	}

}
