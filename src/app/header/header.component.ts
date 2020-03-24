import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	isAuth : boolean;
  emailUserDisplay: string = 'hello';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  	firebase.auth().onAuthStateChanged(
  		(user) => {
  			if(user){
  				this.isAuth = true;
          this.emailUserDisplay = localStorage.getItem('email');          
  			} else {
  				this.isAuth = false;
  			}
  		}

  	);
  }

  onSignOut(){
  	this.authService.signOutUser();
  }

}
