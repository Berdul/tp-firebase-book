import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSpringService } from '../../services/user-spring-service.service';
import { UserSpring } from '../../models/user-spring.model'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
	selector: 'app-userform',
	templateUrl: './userform.component.html',
	styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit {

	newUserForm: FormGroup;
	user : UserSpring;

	constructor(	private route: ActivatedRoute,
					private router: Router,
					private userService: UserSpringService,
					private formBuilder: FormBuilder,
					) { 
	}

	ngOnInit() {
		this.initForm();
	}

	initForm(){
		this.newUserForm = this.formBuilder.group({
			firstname : ['', [Validators.required]],
			lastname : ['', [Validators.required]],
			age : ['', [Validators.required, Validators.pattern(/[0-9]{1,3}/)]]
		});
	}

	onSaveUser(){
		const firstname = this.newUserForm.get('firstname').value;
		const lastname = this.newUserForm.get('lastname').value;
		const age = this.newUserForm.get('age').value;
		const newUser = new UserSpring(firstname, lastname, age);

		this.userService.saveUserSpring(newUser);
		this.userService.findAll();
		this.router.navigate(['/userlistSpring']);
	}
}
