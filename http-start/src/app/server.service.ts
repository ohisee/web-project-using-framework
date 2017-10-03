/**
 * HTTP service
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ServerService {

	constructor(private http: Http) { }

	/**
	 * Store Servers
	 */
	storeServers(servers: any[]) {
		const headers = new Headers({
			'Content-Type': 'application/json'
		});
		return this.http.post('http://localhost:8888/data/save', servers, {
			headers: headers
		});
		// return this.http.put('http://localhost:8888/data/save', servers, {
		// 	headers: headers
		// });
	}

	/**
	 * Get Servers
	 */
	getServers() {
		return this.http.get('http://localhost:8888/data/data').map(
			(response: Response) => {
				const data = response.json(), holder = [];
				for (const server of data) {
					holder.push(server);
				}
				return holder;
			}
		).catch(
			(error: Response) => {
				return Observable.throw('Failure found');
			}
		);
	}

	getAppName() {
		return this.http.get('http://localhost:8888/data/name').map(
			(response: Response) => {
				return response.json();
			}
		);
	}

}
