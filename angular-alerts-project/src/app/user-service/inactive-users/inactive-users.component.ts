import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  //@Input() users: string[];
  //@Output() userSetToActive = new EventEmitter<number>();

	users: string[];

	constructor(private usersService: UsersService) { }

	ngOnInit () {
		this.users = this.usersService.getInactiveUsers();
	}

  onSetToActive(id: number) {
    //this.userSetToActive.emit(id);
		this.usersService.switchUserFromInactiveToActive(id);
  }
}
