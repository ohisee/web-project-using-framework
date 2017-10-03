import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  /**
   * @param {string} email
   * @param {stirng} password
   * @memberof AuthService
   */
  public signin(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        (user: firebase.User) => {
          resolve(user.getIdToken(false));
        }
      ).catch(
        (error) => {
          reject(error);
        }
      );
    });
  }

  public signout() {
    firebase.auth().signOut();
  }

  public allowToAccess(): boolean {
    return (firebase.auth().currentUser != null) ? true: false;
  }

}