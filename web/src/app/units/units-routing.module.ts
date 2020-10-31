import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitsListPage } from './pages/list/list.page';
import { UnitsDetailsPage } from './pages/details/details.page';
import { UnitsResolver } from './services/resolvers/units.resolver';
import { UnitResolver } from './services/resolvers/unit.resolver';

const routes: Routes = [
  {
    path: '',
    component: UnitsListPage,
    resolve: {
      units: UnitsResolver
    }
  },
  {
    path: 'new',
    component: UnitsDetailsPage
  },
  {
    path: ':id',
    component: UnitsDetailsPage,
    resolve: {
      unit: UnitResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { }
