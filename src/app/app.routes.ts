import {Routes, RouterModule} from '@angular/router';
import {PathwayComponent} from './pathway/pathway.component';
import {SignUpOrSignInComponent} from "./sign-up-or-sign-in/sign-up-or-sign-in.component";

const appRoutes: Routes = [
  {
    path: 'pathway/:id',
    component: PathwayComponent
  },
  {
    path: 'signin',
    component: SignUpOrSignInComponent
  }
];

export const routes = RouterModule.forRoot(appRoutes);
