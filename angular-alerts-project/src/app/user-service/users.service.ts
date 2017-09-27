/**
 * This is Users Service
 */
import { Injectable } from '@angular/core';

import { CounterService } from './counter.service';

@Injectable()
export class UsersService {

	private activeUsers: string[] = ['Max', 'Anna', 'Person A', 'Person B', 'Person C'];
	private inactiveUsers: string[] = ['Chris', 'Manu'];

	constructor(private counterService: CounterService) {}

	switchUserFromActiveToInactive(id: number) {
		if (id < this.activeUsers.length) {
			this.inactiveUsers.push(this.activeUsers[id]);
			this.activeUsers.splice(id, 1);
			this.counterService.increment();
		}
	}

	switchUserFromInactiveToActive(id: number) {
		if (id < this.inactiveUsers.length) {
			this.activeUsers.push(this.inactiveUsers[id]);
			this.inactiveUsers.splice(id, 1);
			this.counterService.increment();
		}
	}

	getActiveUsers() {
		return this.activeUsers;
	}

	getInactiveUsers() {
		return this.inactiveUsers;
	}

}
