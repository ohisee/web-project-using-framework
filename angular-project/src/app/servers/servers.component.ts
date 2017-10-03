import { Component, OnInit } from '@angular/core';

@Component({
  //selector: '[app-servers]', // select as attribute
  //selector: '.app-servers', // select as class
  selector: 'app-servers',
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>`,
	templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

	allowNewServer: boolean = false;
	serverCreationStatus: string = "No Server was created!";
	serverName: string = 'init value';
	serverCreated: boolean = false;
	servers: string[] = ['TestServer1', 'TestServer2'];

  constructor() {
		setTimeout(() => {
			this.allowNewServer = true;
		}, 2000);
	}

  ngOnInit() {}

	onCreateServer() {
		this.serverCreated = true;
		this.servers.push(this.serverName);
		this.serverCreationStatus = "Created Server " + this.serverName;
	}

	onUpdateServerName(event: Event) {
		this.serverName = (<HTMLInputElement>event.target).value;
	}

}
