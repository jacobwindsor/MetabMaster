import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "app/home/home.component";
import {HelpComponent} from "./help/help.component";

const appRoutes: Routes = [
  // {
  //   path: 'compounds/create',
  //   //component: PathwayCreateComponent,
  // },
  // {
  //   path: 'compounds/:id',
  //   //component: PathwayComponent
  // },
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
