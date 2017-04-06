import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {environment} from '../environments/environment';


@Injectable()
export class FirebaseService {
  public fbRef: any;
  public auth: any;
  public db: any;

  constructor() {
    this.fbRef = firebase.initializeApp(environment.firebase);
    this.auth = this.fbRef.auth();
    this.db = this.fbRef.database();
  }

}
