import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { ErrorService } from '../errors/error.service';

@Injectable()
export class AuthService {

  private URL: string = 'http://localhost:3000/user';

  constructor(private http: Http, private errorService: ErrorService) { }

  /**
   * @param user
   */
  signup(user: User) {
    const body = JSON.stringify(user.toObject());
    const headers =  new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.URL, body, {headers: headers})
      .map(
        (response: Response) => response.json()
      )
      .catch(
        //(error: Response) => Observable.throw(error.json())
        (error: Response) => {
          this.errorService.handelError(error.json());
          return Observable.throw(error.json());
        }
      );
  }

  /**
   * @param user
   */
  signin(user: User) {
    const body = JSON.stringify(user.toObject());
    const headers =  new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.URL + '/signin', body, {headers: headers})
      .map(
        (response: Response) => response.json()
      )
      .catch(
        //(error: Response) => Observable.throw(error.json())
        (error: Response) => {
          this.errorService.handelError(error.json());
          return Observable.throw(error.json());
        }
      );
  }

  logout() {
    sessionStorage.clear();
  }

  isLoggedIn() {
    return sessionStorage.getItem('token') !== null;
  }

}
