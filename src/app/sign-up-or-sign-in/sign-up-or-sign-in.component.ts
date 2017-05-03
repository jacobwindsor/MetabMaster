import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {PasswordValidators, EmailValidators} from 'ng2-validators';
import {NotifierService} from "../notifier.service";

@Component({
  selector: 'app-sign-up-or-sign-in',
  templateUrl: './sign-up-or-sign-in.component.html',
  styleUrls: ['./sign-up-or-sign-in.component.css']
})
export class SignUpOrSignInComponent implements OnInit {

  signInForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      EmailValidators.normal
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      PasswordValidators.repeatCharacterRegexRule(4),
      Validators.minLength(6)
    ]))
  });

  signUpForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      EmailValidators.normal
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      PasswordValidators.repeatCharacterRegexRule(4)
    ])),
    // TODO: add password match validation
    password2: new FormControl('', Validators.compose([
      Validators.required
    ]))
  });

  constructor(public auth: AuthService, public router: Router, private notifer: NotifierService) { }

  ngOnInit(): void {
    this.auth.authState$.subscribe(user => {
      if (user) {
        this.router.navigate(['/']);
      }
    });
  }

  signIn() {
    if (this.signInForm.errors) {
      return;
    }

    const formVal = this.signInForm.value;
    this.auth.signInWithEmailAndPassword(formVal.email, formVal.password)
      .then(() => this.notifer.notify('<h2>Welcome back!</h2><p>Please fill in ' +
        '<a href="https://goo.gl/forms/iWcyI8PjcLckCLk83" target="_blank">this form</a> to give critical feedback.</p>',
        'success', false))
      .catch(err =>  this.notifer.notify(err.message, 'error'));
  }

  signUp() {
    if (this.signUpForm.errors) {
      return;
    }

    const formVal = this.signUpForm.value;
    this.auth.signUpWithEmailAndPassword(formVal.email, formVal.password)
      .then(() => this.notifer.notify('<h2>Welcome to MetabMaster</h2> <p>You can now start creating pathway stories. ' +
        'See the <a href="help">help guide</a> for guidance.</p>' +
        '<p>Please fill in ' +
        '<a href="https://goo.gl/forms/iWcyI8PjcLckCLk83" target="_blank">this form</a> to give critical feedback.</p>',
        'success', false))
      .catch(err => this.notifer.notify(err.message, 'error'));
  }

}
