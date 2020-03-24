import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';

@Component({
	selector: 'app-book-form',
	templateUrl: './book-form.component.html',
	styleUrls: ['./book-form.component.scss']
})

export class BookFormComponent implements OnInit {

	newBookForm: FormGroup;
	FileIsUploading = false;
	fileUrl : string;
	fileUploaded = false;

	constructor(private formBuilder: FormBuilder,
				private booksService : BooksService,
				private router: Router) { }

	ngOnInit() {
		this.initForm();
	}

	initForm(){
		this.newBookForm = this.formBuilder.group({
			title : ['', [Validators.required]],
			author : ['', [Validators.required]]
		});
	}

	onSaveBook(){
		const title = this.newBookForm.get('title').value;
		const author = this.newBookForm.get('author').value;
		const newBook = new Book(title, author);
		if(this.fileUrl && this.fileUrl !== ''){
			newBook.photo = this.fileUrl;
		}

		this.booksService.createNewBook(newBook);
		this.router.navigate(['/books']);
	}

	onUploadFile(file: File){
		this.FileIsUploading = true;
		this.booksService.uploadFile(file).then(
			(url : string) => {
				this.fileUrl = url;
				this.FileIsUploading = false;
				this.fileUploaded = true;
			}
		);
	}

	detectFile(event){
		this.onUploadFile(event.target.files[0]);
	}

}
