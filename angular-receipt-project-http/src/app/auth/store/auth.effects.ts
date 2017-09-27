import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private router: Router) { }

  @Effect() authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: { username: string, password: string }) => {
      return Observable.fromPromise(
        firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password)
          .then(() => {
            return Promise.resolve(true);
          })
          .catch((error) => {
            return Promise.resolve(false);
          }));
    })
    .switchMap((signedup) => {
      if (signedup) {
        return Observable.fromPromise(
          firebase.auth().currentUser.getIdToken());
      }
      return Observable.fromPromise(Promise.resolve());
    })
    .mergeMap((token: string) => {
      if (token) {
        return [
          {
            type: AuthActions.SIGNUP
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      }
      return [
        {
          type: AuthActions.SIGNUP_ERRED
        }
      ];
    });

  @Effect() authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: { username: string, password: string }) => {
      return Observable.fromPromise(
        firebase.auth().signInWithEmailAndPassword(authData.username, authData.password)
          .then(() => {
            return Promise.resolve(true);
          })
          .catch((error) => {
            return Promise.resolve(false);
          }));
    })
    .switchMap((signedin) => {
      if (signedin) {
        return Observable.fromPromise(
          firebase.auth().currentUser.getIdToken());
      }
      return Observable.fromPromise(Promise.resolve());
    })
    .mergeMap((token: string) => {
      if (token) {
        this.router.navigate(['/']);
        return [
          {
            type: AuthActions.SIGNIN
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      }
      return [
        {
          type: AuthActions.SIGNIN_ERRED
        }
      ];
    });

  @Effect({ dispatch: false }) authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .do(() => {
      this.router.navigate(['/']);
    });

}
