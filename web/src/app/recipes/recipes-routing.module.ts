import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeListPage } from './pages/list/list.page';
import { RecipeDetailsChangePage } from './pages/details/change/change.page';
import { RecipeDetailsViewPage } from './pages/details/view/view.page';
import { RecipeResolver } from './services/resolvers/recipe.resolver';
import { RecipesResolver } from './services/resolvers/recipes.resolver';

import { CanDeactivateGuard } from '@cookbook.shared/guards/can-deactivate.guard';

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
    component: RecipeDetailsViewPage,
    resolve: {
      recipe: RecipeResolver
    }
  },
  {
    path: ':id/edit',
    component: RecipeDetailsChangePage,
    canDeactivate: [CanDeactivateGuard],
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
