import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseConfig } from './shared/config';
import 'bootstrap/dist/css/bootstrap.min.css';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {}
  
  ngOnInit() {
    firebase.initializeApp(firebaseConfig);
  }
}
