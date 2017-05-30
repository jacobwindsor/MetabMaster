import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import {routes} from './app.routes';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import {NotifierService} from "./notifier.service";
import { CompoundsComponent } from './compounds/compounds.component';
import {CompoundService} from "./compound.service";
import { CompoundDetailComponent } from './compound-detail/compound-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    CompoundsComponent,
    CompoundDetailComponent
  ],
  entryComponents: [
  ],
  imports: [
    RouterModule,
    routes,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    NotifierService,
    CompoundService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
