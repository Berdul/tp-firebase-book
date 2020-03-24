import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BooksService } from './services/books.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';


import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PresentationViewComponent } from './presentation-view/presentation-view.component';
import { UserlistSpringComponent } from './userlist-spring/userlist-spring.component';
import { UserformComponent } from './userlist-spring/userform/userform.component';

const appRouters: Routes = [
  { path: 'dashboard', component: PresentationViewComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'auth/signup', component: SignupComponent},
  { path: 'books', component: BookListComponent},
  { path: 'books/new', canActivate:[AuthGuardService], component: BookFormComponent},
  { path: 'books/view/:id', component: SingleBookComponent},
  { path: 'userlistSpring', component: UserlistSpringComponent},
  { path: 'addUserSpring', canActivate:[AuthGuardService], component: UserformComponent},
  { path: '', redirectTo: 'dashboard', pathMatch:'full'},
  { path: '**', redirectTo: 'books'}

]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent,
    SigninComponent,
    PresentationViewComponent,
    UserlistSpringComponent,
    UserformComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRouters),
  ],
  providers: [
    BooksService,
    AuthService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
