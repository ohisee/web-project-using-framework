/**
 *
 */
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ServersService } from '../servers.service';

export interface Server {
	id: number;
	name: string;
	status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {

	constructor(private serversService: ServersService) {}

	/**
	 * This service will run everyone we rerender the route,
	 * so snap shot route is fine
	 */
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
		const id = +route.params['id'];
		return this.serversService.getServer(id);
	}

}
