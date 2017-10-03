import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate, OnDestroy {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
	allowEdit: boolean = false;
	changeSaved: boolean = false;
	paramsSubscription: Subscription;

  constructor(
		private serversService: ServersService,
		private activatedRoute: ActivatedRoute,
		private router: Router) { }

	/**
	 * Fetch query params and fragment through subscribe and must unsubscribe
	 */
  ngOnInit() {
		this.activatedRoute.queryParams.subscribe(
			(queryParams: Params) => {
				this.allowEdit = (queryParams['allowEdit'] === '1' ? true : false);
			}
		);
		this.activatedRoute.fragment.subscribe();
		const id = +this.activatedRoute.snapshot.params['id'];
		this.server = this.serversService.getServer(id);
		this.paramsSubscription = this.activatedRoute.params.subscribe(
			(params: Params) => {
				const newid = +params['id'];
				this.server = this.serversService.getServer(newid);
			}
		);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

	ngOnDestroy() {
		this.paramsSubscription.unsubscribe();
	}

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
			name: this.serverName, status: this.serverStatus
		});
		this.changeSaved = true;
		this.router.navigate(['../'], {relativeTo: this.activatedRoute})
  }

	canDeactivat(): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.allowEdit) {
			return true;
		}
		if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status)
				&& !this.changeSaved) {
			return confirm("Do you want to discard your changes?");
		} else {
			return true;
		}
	}

}
