/**
 *
 */
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	loadedFeature = 'recipe';

	ngOnInit() {
		firebase.initializeApp({
			'apiKey': "AIzaSyBFYLZy-KluU-nlxTXLZU0RZm1cLbE_jZc",
			'authDomain': "http-webapp306-angular.firebaseapp.com",
			'databaseURL': "https://http-webapp306-angular.firebaseio.com",
			'projectId': "http-webapp306-angular",
		});
	}

	onNavigate(feature: string) {
		this.loadedFeature = feature;
	}

}
