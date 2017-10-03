import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { User } from '../shared/model/user';

/**
 * Initial user
 */
export const UNKNOWN_USER: User = {
  firstName: 'Unknown'
};

/**
 * This is stateful user data service / observable data service
 *
 * @export
 * @class UserService
 */
@Injectable()
export class UserService {

  private subject: BehaviorSubject<User> = new BehaviorSubject<User>(UNKNOWN_USER);

  // user$: Observable<User> = Observable.of(UNKNOWN_USER);
  user$: Observable<User> = this.subject.asObservable();

  constructor(private http: Http) { }

  public login(email: string, password: string): Observable<User> {
    const httpHeaders: Headers = new Headers();
    httpHeaders.append('Content-Type', 'application/json');
    // this.http.post('/api/login', { email, password }, { headers: httpHeaders }).map(
    //   (response: Response) => {
    //     return response.json();
    //   }
    // ).subscribe(
    //   (user) => {
    //     this.subject.next(user);
    //   }, () => {
    //     alert('login failed');
    //   });
    return this.http.post('/api/login', { email, password }, { headers: httpHeaders }).map(
      (response: Response) => {
        return response.json();
      }
    ).do((user) => {
      console.log(user);
    }).do((user) => {
      this.subject.next(user);
    }).publishLast().refCount();
  }

}
