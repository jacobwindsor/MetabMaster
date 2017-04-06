import { Injectable } from '@angular/core';
import {FirebaseService} from "./firebase.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class AuthService {
  private authState: BehaviorSubject<null> = new BehaviorSubject<any>(null);
  public authState$: Observable<any> = this.authState.asObservable();

  constructor(public fb: FirebaseService) {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        // User signed in
        this.authState.next(user);
      } else {
        this.authState.next(null);
      }
    }, err => {
      console.log(err);
    });
  }

  signUpWithEmailAndPassword(email, password): Promise<any> {
    return this.fb.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email, password): Promise<any> {
    return this.fb.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.fb.auth.signOut();
  }

  get authenticated(): boolean {
    return !!this.fb.auth.currentUser;
  }
}
