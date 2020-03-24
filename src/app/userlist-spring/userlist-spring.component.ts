import { Component, OnInit } from '@angular/core';
import { UserSpringService } from '../services/user-spring-service.service'
import { UserSpring } from '../models/user-spring.model';
import { Subscription } from 'rxjs-compat';

@Component({
	selector: 'app-userlist-spring',
	templateUrl: './userlist-spring.component.html',
	styleUrls: ['./userlist-spring.component.scss']
})
export class UserlistSpringComponent implements OnInit {

	users: UserSpring[];
	constructor(private userService: UserSpringService) { }

	ngOnInit() {
		this.userService.findAll().subscribe(data => {
			this.users = data;
			console.log(data);
		});
	}
}
