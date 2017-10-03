import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(
		private serversService: ServersService,
		private router: Router,
		private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

	/**
	 * Must tell navigate which relative route
	 * this.router.navigate(['servers'], {relativeTo: this.activatedRoute});
	 * Inject ActivatedRoute to get current active route, the route which loaded the component
	 * So, if current route is /servers, then navigate(['servers'], {relativeTo: this.activatedRoute}
	 * will redirect to /servers/servers, relative to the current route
	 */
	onReload() {
		//this.router.navigate(['servers'], {relativeTo: this.activatedRoute});
	}

}
