import { Injectable } from '@angular/core';
import * as firebase from'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(prenom: string, nom: string, pseudo: string, email: string, password: string){
  	return new Promise(
  		(resolve, reject) => {
  			firebase.auth().createUserWithEmailAndPassword(email, password).then(
  				() => {
            localStorage.setItem('email', email);
  					resolve();
  				},
  				(error) => {
  					reject(error);
  				}
  			)
  		} 
  	);
  }

  signInUser(email: string, password: string){
  	return new Promise(
  		(resolve, reject) => {
  			firebase.auth().signInWithEmailAndPassword(email, password).then(
  				() => {
            localStorage.setItem('email', email);
  					resolve();
  				},
  				(error) => {
  					reject(error);
  				}
  			)
  		}
  	);
  }

  signOutUser(){
    localStorage.removeItem('email');
  	firebase.auth().signOut();
  }
}
