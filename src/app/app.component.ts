import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {
  constructor(public auth: AuthService) { }

  logout() {
    this.auth.logout();
  }
}
