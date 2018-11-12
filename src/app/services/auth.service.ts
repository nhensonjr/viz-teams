import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { AuthData } from '../models/auth-data.mode';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private afauth: AngularFireAuth) {
  }

  initAuthListener() {
    this.afauth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/']);
      } else {
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afauth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log('result -> ', result);
    }).catch(error => {
      console.log('error -> ', error);
    });
  }

  login(authData: AuthData) {
    this.afauth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
    }).catch(error => {
      console.log('error -> ', error);
    });
  }

  logout() {
    this.afauth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
