import { Component, OnInit } from '@angular/core';

import { UsersService } from './users.service'

import { CounterService } from './counter.service';

@Component({
  selector: 'app-user-service',
  templateUrl: './user-service.component.html',
  styleUrls: ['./user-service.component.css'],
	providers: [UsersService, CounterService]
})
export class UserServiceComponent implements OnInit {

	constructor(private usersService: UsersService) { }

	ngOnInit() { }
	
}
