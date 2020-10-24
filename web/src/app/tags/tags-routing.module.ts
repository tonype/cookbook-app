import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagsListPage } from './pages/list/list.page';
import { TagsDetailsPage } from './pages/details/details.page';
import { TagsResolver } from './services/resolvers/tags.resolver';

const routes: Routes = [
  {
    path: '',
    component: TagsListPage
  },
  {
    path: ':id',
    component: TagsDetailsPage,
    resolve: {
      recipe: TagsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
