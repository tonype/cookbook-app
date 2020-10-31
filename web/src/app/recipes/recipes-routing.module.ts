import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeListPage } from './pages/list/list.page';
import { RecipeDetailsPage } from './pages/details/details.page';
import { RecipeResolver } from './services/resolvers/recipe.resolver';
import { RecipesResolver } from './services/resolvers/recipes.resolver';

const routes: Routes = [
  {
    path: '',
    component: RecipeListPage,
    resolve: {
      recipes: RecipesResolver
    }
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
