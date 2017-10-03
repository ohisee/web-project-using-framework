/**
 *
 */
import { Subject } from 'rxjs/Subject';

/**
 * Subject has Observer and Observable in one object
 * Subject.next() push value
 * Subject.subscribe() to consume
 */
export class UsersService {
	userActivated = new Subject();
}
