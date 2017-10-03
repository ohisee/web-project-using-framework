/**
 * Server service
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ServerService {

	constructor(private http: Http) { }

	private HostUrl: string = 'http://localhost:8888/ping';
	private csrfUrl: string = 'http://localhost:8888/im';

	pingServer(t: {token: string, parameterName: string, headerName: string}) {
		console.log('server');
		const headrs: Headers = new Headers();
		headrs.append('protected', 'protected');
		headrs.append(t.headerName, t.token);
		const params : URLSearchParams = new URLSearchParams();
		params.append(t.parameterName, t.token);
		const options = new RequestOptions({
			//headers: headrs,
			withCredentials: true,
			method: RequestMethod.Get,
			params: params
		});
		//options.headers.append(t.headerName, t.token);
		console.log(options);
		//const hostUrlWithParams = this.HostUrl + '?' + t.parameterName + '=' + t.token;
		//document.cookie = 'XSRF-TOKEN = ' + t.token;
		return this.http.get(this.HostUrl, options).map(
			(response: Response) => {
				console.log(response);
				console.log(response.headers);
				return response;
			}
		).catch(
			(error: Response) => {
				console.log('error coming');
				console.log(error);
				return Observable.throw(error);
			}
		)
	}

	initToken() {
		console.log('token');
		const options = new RequestOptions({
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			//withCredentials: true,
			method: RequestMethod.Get
		});
		return this.http.get(this.csrfUrl).map(
			(response: Response) => {
				if (!response.hasOwnProperty('json')) {
					console.log(response);
				} else {
					console.log(response.json());
				}
				const t = response.json();
				return {
					'token': t['token'],
					'parameterName': t['parameterName'],
					'headerName': t['headerName']
				};
			}
		).catch(
			(error: Response) => {
				console.log('error coming');
				console.log(error);
				return Observable.throw(error);
			}
		)
	}

}
