import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs-compat';
import * as firebase from 'firebase';

@Injectable({
	providedIn: 'root'
})
export class BooksService {

	books: Book[]=[];

	ngOnInit(){
	}

	booksSubject = new Subject<Book[]>(); 
	constructor() { 
		this.getBooks();
	}

	emitBooks(){
		this.booksSubject.next(this.books);
	}

	saveBooks(){
		firebase.database().ref('/books').set(this.books);
	}

	getBooks(){
		firebase.database().ref('/books').on('value', (data) => {
			this.books = data.val() ? data.val() : [];
			/*if(data.val()){
				this.books = data.val();
			} else {
				this.books = [];
			}*/
			this.emitBooks();
		});
	}

	getSingleBook(id: number) {
		return new Promise(
			(resolve, reject) => {
				firebase.database().ref('/books/' + id).once('value').then(
					(data) => {
						resolve(data.val());
					},
					(error) => {
						resolve(error);
					}
					);
			}
			);
	}

	createNewBook(newBook:Book){
		this.books.push(newBook);
		this.saveBooks();
		this.emitBooks();
	}

	removeBook(book: Book){
		if(book.photo) {
			const storageRef = firebase.storage().refFromURL(book.photo);
			storageRef.delete().then(
				() => {
					console.log('Photo removed!');
				},
				(error) => {
					console.log('Could not remove photo! : ' + error);
				}
			);
		} else {
			console.log('Pas de photo à supprimer');
		}


		const indexBookRemove = this.books.findIndex(
			(bookEl) => {
				if(bookEl === book) {
					return true;
				}
			} 
			);
		this.books.splice(indexBookRemove, 1);
		this.saveBooks();
		this.emitBooks();
	}

	uploadFile(file : File){
		return new Promise (
			(resolve, reject) => {
				const almostUniqueFileName = Date.now().toString();
				const upload = firebase.storage().ref()
				.child('/images/' + almostUniqueFileName + file.name)
				.put(file);
				upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
					() => {
						console.log('Chargement');
					} ,
					(error ) => {
						console.log('Loading error : ' +error);
						reject();
					},
					() => {
						resolve(upload.snapshot.ref.getDownloadURL());
					}
					);

			} 
			);
	}
}
