import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserSpring } from '../models/user-spring.model';
import { Observable } from 'rxjs/Observable';

@Injectable({
	providedIn: 'root'
})
export class UserSpringService {

	private userUrl : string;

	constructor(private http: HttpClient) { 
		this.userUrl = 'https://alea-spring.herokuapp.com/listPlayer';
	}

	public findAll(): Observable<UserSpring[]>{
		return this.http.get<UserSpring[]>(this.userUrl);
	}

	// put return a Observable reponse, .subscribe is needed to make the put work
	public saveUserSpring(user: UserSpring) {
		return this.http.post<UserSpring>(this.userUrl, user).subscribe(res => console.log(res));
	}
}