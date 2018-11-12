import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore,
              private  auth: AngularFireAuth) {
  }

  getUser(): Observable<User> {
    return this.db.collection('user').doc('AZPLPEQaCJfqRPpqXPCa').valueChanges() as Observable<User>;
  }

  register() {
    this.auth.auth.createUserWithEmailAndPassword('jon2@email.com', 'password');
  }
}
