import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanLoad {

  /**
   * Authentication guard
   * 
   * @param {Route} route 
   * @returns {(boolean | Observable<boolean> | Promise<boolean>)} 
   * @memberof AuthGuard
   */
  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return false;
  }

}