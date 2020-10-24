import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeListPage } from './pages/list/list.page';
import { RecipeDetailsPage } from './pages/details/details.page';
import { RecipeResolver } from './services/resolvers/recipe.resolver';

const routes: Routes = [
  {
    path: '',
    component: RecipeListPage
  },
  {
    path: ':id',
    component: RecipeDetailsPage,
    resolve: {
      recipe: RecipeResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
