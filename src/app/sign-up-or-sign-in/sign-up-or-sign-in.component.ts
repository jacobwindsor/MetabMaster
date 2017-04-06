import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-sign-up-or-sign-in',
  templateUrl: './sign-up-or-sign-in.component.html',
  styleUrls: ['./sign-up-or-sign-in.component.css']
})
export class SignUpOrSignInComponent implements OnInit {
  signInForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      CustomValidators.email
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ]))
  });

  signUpForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      CustomValidators.email
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])),
    password2: new FormControl('', Validators.compose([
      Validators.required,
      CustomValidators.equalTo('password')
    ]))
  });

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.auth.authState$.subscribe(user => {
      if(user) {
        this.router.navigate(['/']);
      }
    });
  }

  signIn() {
    if (this.signInForm.errors) {
      return;
    }

    const formVal = this.signInForm.value;
    this.auth.signInWithEmailAndPassword(formVal.email, formVal.password);
  }

  signUp() {
    if (this.signUpForm.errors) {
      return;
    }

    const formVal = this.signUpForm.value;
    this.auth.signUpWithEmailAndPassword(formVal.email, formVal.password)
  }

}
