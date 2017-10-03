import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { firebaseConfig } from '../shared/config';

@Injectable()
export class DataStorageService {

  constructor(private authService: AuthService) {}

  fetchData() {
    if (this.authService.allowToAccess()) {
      firebase.database().ref('title').once('value')
      .then((data) => {
        console.log('Fire base', data.key, data.val());
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

}