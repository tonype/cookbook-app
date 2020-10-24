import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitsListPage } from './pages/list/list.page';
import { UnitsDetailsPage } from './pages/details/details.page';
import { UnitsResolver } from './services/resolvers/units.resolver';

const routes: Routes = [
  {
    path: '',
    component: UnitsListPage
  },
  {
    path: ':id',
    component: UnitsDetailsPage,
    resolve: {
      recipe: UnitsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { }
