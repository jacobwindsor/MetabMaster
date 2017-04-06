import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { PathwayComponent } from './pathway/pathway.component';
import {routes} from '../app.routes';
import { MaterialModule } from '@angular/material';
import { PathwayListComponent } from './pathway-list/pathway-list.component';
import {FirebaseService} from "./firebase.service";
import {PathwayService} from "./pathway.service";

@NgModule({
  declarations: [
    AppComponent,
    PathwayComponent,
    PathwayListComponent
  ],
  imports: [
    routes,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [
    FirebaseService,
    PathwayService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
