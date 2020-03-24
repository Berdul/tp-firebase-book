import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	signUpForm : FormGroup;
	errorMessage: string;

	constructor(private formBuilder: FormBuilder,
				private authService: AuthService,
				private router : Router) { }

	ngOnInit() {
		this.initForm();
	}

	initForm(){
		this.signUpForm = this.formBuilder.group({
			firstname: ['', [Validators.required, Validators.pattern(/[a-zA-Z]{2,}/)]],
			name: ['', [Validators.required, Validators.pattern(/[a-zA-Z]{2,}/)]],
			pseudo: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{4,}/)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
		});
	}

	onSubmit(){
		const firstname = this.signUpForm.get('firstname').value;
		const name = this.signUpForm.get('name').value;
		const pseudo = this.signUpForm.get('pseudo').value;
		const email = this.signUpForm.get('email').value;
		const password = this.signUpForm.get('password').value;


		this.authService.createNewUser(firstname, name, pseudo, email, password).then(
			() => {
				this.router.navigate(['books']);
			},
			(error) => {
				this.errorMessage = error;
			}
		);
	}


}
