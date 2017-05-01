import {Routes, RouterModule} from '@angular/router';
import {PathwayComponent} from './pathway/pathway.component';
import {SignUpOrSignInComponent} from "./sign-up-or-sign-in/sign-up-or-sign-in.component";
import {PathwayCreateComponent} from "./pathway-create/pathway-create.component";
import {AuthGuard} from "./auth.guard";
import {HomeComponent} from "app/home/home.component";
import {PathwayUpdateComponent} from "./pathway-update/pathway-update.component";
import {HelpComponent} from "./help/help.component";

const appRoutes: Routes = [
  {
    path: 'pathway/create',
    component: PathwayCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pathway/:id/update',
    component: PathwayUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pathway/:id',
    component: PathwayComponent
  },
  {
    path: 'signin',
    component: SignUpOrSignInComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: '',
    component: HomeComponent

  }
];

export const routes = RouterModule.forRoot(appRoutes);
