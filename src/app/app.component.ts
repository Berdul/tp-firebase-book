import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { BrowserModule, Title } from '@angular/platform-browser';
declare var $: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'Dev-BeVer';

	constructor(private titleService : Title) {
		var firebaseConfig = {
			apiKey: "AIzaSyCiRaV5F6dcQ9IX3VReT6LyeXypzeJickQ",
			authDomain: "tp-firebase-book.firebaseapp.com",
			databaseURL: "https://tp-firebase-book.firebaseio.com",
			projectId: "tp-firebase-book",
			storageBucket: "tp-firebase-book.appspot.com",
			messagingSenderId: "307749844086",
			appId: "1:307749844086:web:19232b3ef2b65ff3291b57"

			
		};
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);}

		ngOnInit(){
			this.titleService.setTitle(this.title);
		}



	}