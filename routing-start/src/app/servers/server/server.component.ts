import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationExtras, Data } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
	paramsSubscription: Subscription;

  constructor(
		private serversService: ServersService,
		private activatedRoute: ActivatedRoute,
		private router: Router) { }

  ngOnInit() {
		// const id = +this.activatedRoute.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
		// this.paramsSubscription = this.activatedRoute.params.subscribe(
		// 	(params: Params) => {
		// 		const newid = +params['id'];
		// 		this.server = this.serversService.getServer(newid);
		// 	}
		// );
		this.activatedRoute.data.subscribe(
			(data: Data) => {
				this.server = data['server'];
			}
		);
  }

	ngOnDestroy() {
		// this.paramsSubscription.unsubscribe();
	}

	/**
	 * navigate this.router.navigate(['/servers', this.server.id, 'edit']);
	 * or this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
	 * @see node_modules/@angular/router/src/config.d.ts
	 * @code node_modules/@angular/router/src/config.d.ts
	 */
	onEdit() {
		//this.router.navigate(['/servers', this.server.id, 'edit']);
		const rel: NavigationExtras = {
			relativeTo: this.activatedRoute,
			queryParamsHandling: 'preserve'
		};
		this.router.navigate(['edit'], rel);
	}

}
