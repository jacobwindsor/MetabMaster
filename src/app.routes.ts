import {Routes, RouterModule} from '@angular/router';
import {PathwayComponent} from './app/pathway/pathway.component';

const appRoutes: Routes = [
  {
    path: 'pathway/:id',
    component: PathwayComponent
  }
];

export const routes = RouterModule.forRoot(appRoutes);
