/**
 * This is authentication guard
 */
import { Injectable } from '@angular/core'
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

	constructor(private authService: AuthService, private router: Router) { }

	/**
	 * Check can activate
	 * @param activeRoute
	 * @param state
	 * @return boolean true or false
	 */
	canActivate(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		 if (this.authService.isAuthenticated()) {
			 return true;
		 } else {
			 //this.router.navigate(['/']);
			 this.authService.notAuthenticated.next(true);
			 return false;
		 }
	}

	/**
	 * Check can load for lasily loaded module
	 */
	canLoad(route: Route): boolean {
		if (this.authService.isAuthenticated()) {
			return true;
		} else {
			//this.router.navigate(['/']);
			this.authService.notAuthenticated.next(true);
			return false;
		}
	}

}
