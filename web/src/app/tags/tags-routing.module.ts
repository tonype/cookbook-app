import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagsListPage } from './pages/list/list.page';
import { TagsDetailsPage } from './pages/details/details.page';
import { TagResolver } from './services/resolvers/tag.resolver';
import { TagsResolver } from './services/resolvers/tags.resolver';

const routes: Routes = [
  {
    path: '',
    component: TagsListPage,
    resolve: {
      tags: TagsResolver
    }
  },
  {
    path: 'new',
    component: TagsDetailsPage
  },
  {
    path: ':id',
    component: TagsDetailsPage,
    resolve: {
      tag: TagResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
