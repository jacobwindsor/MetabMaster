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
import { DiagramPresComponent } from './diagram.pres/diagram.pres.component';
import { PathwayEditComponent } from './pathway-edit/pathway-edit.component';
import { PathwayUpdateComponent } from './pathway-update/pathway-update.component';
import { PathwayDeleteDialogComponent } from './pathway-delete-dialog/pathway-delete-dialog.component';
import { InteractiveDescriptionPresComponent } from './interactive-description.pres/interactive-description.pres.component';
import {PathwayListService} from "./pathway-list.service";
import { AlertComponent } from './alert/alert.component';
import { HelpComponent } from './help/help.component';
import {NotifierService} from "./notifier.service";

@NgModule({
  declarations: [
    AppComponent,
    PathwayComponent,
    PathwayListComponent,
    SignUpOrSignInComponent,
    PathwayCreateComponent,
    HomeComponent,
    DiagramPresComponent,
    PathwayEditComponent,
    PathwayUpdateComponent,
    PathwayDeleteDialogComponent,
    InteractiveDescriptionPresComponent,
    AlertComponent,
    HelpComponent
  ],
  entryComponents: [
    PathwayDeleteDialogComponent
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
    PathwayListService,
    AuthService,
    AuthGuard,
    NotifierService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
