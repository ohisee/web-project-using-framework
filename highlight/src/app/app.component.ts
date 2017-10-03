import { Component, AfterViewInit } from '@angular/core';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
		'./app.component.css'
	]
})
export class AppComponent {

	private _buttonDisabledForCLick: boolean = true;
	private csrfToken: {token: string, parameterName: string, headerName: string};

	constructor(private serverService: ServerService) { }

	get buttonDisabledForCLick(): boolean {
		return this._buttonDisabledForCLick;
	}

	get divIdEditor(): string {
		return this.divIdEditor;
	}

	onClick() {
		console.log('click');
		if (this.csrfToken != null) {
			console.log('trying');
			this.serverService.pingServer(this.csrfToken).subscribe(
				(response) => {
					console.log(response);
				},
				(error) => {
					console.log('encountered error');
					console.log(error);
				}
			);
		}
	}

	onStart() {
		console.log('on start');
		this.serverService.initToken().subscribe(
			(response) => {
				console.log('good on start');
				console.log(response);
				this._buttonDisabledForCLick = false;
				this.csrfToken = response;
			},
			(error) => {
				console.log('encountered error');
				console.log("error is " + error);
			}
		);
	}

}
