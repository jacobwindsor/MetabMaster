import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { PathwayComponent } from './pathway/pathway.component';
import {routes} from './app.routes';
import { MaterialModule } from '@angular/material';
import { PathwayListComponent } from './pathway-list/pathway-list.component';
import {FirebaseService} from "./firebase.service";
import {PathwayService} from "./pathway.service";
import { SignUpOrSignInComponent } from './sign-up-or-sign-in/sign-up-or-sign-in.component';
import {AuthService} from "./auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PathwayCreateComponent } from './pathway-create/pathway-create.component';
import {AuthGuard} from "./auth.guard";
import { HomeComponent } from './home/home.component';
import { DiagramComponent } from './diagram/diagram.component';
import { PathwayEditComponent } from './pathway-edit/pathway-edit.component';
import { PathwayUpdateComponent } from './pathway-update/pathway-update.component';

@NgModule({
  declarations: [
    AppComponent,
    PathwayComponent,
    PathwayListComponent,
    SignUpOrSignInComponent,
    PathwayCreateComponent,
    HomeComponent,
    DiagramComponent,
    PathwayEditComponent,
    PathwayUpdateComponent
  ],
  imports: [
    routes,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    FirebaseService,
    PathwayService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
