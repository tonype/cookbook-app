import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeListPage } from './pages/list/list.page';
import { RecipeDetailsEditPage } from './pages/details/edit/edit.page';
import { RecipeDetailsViewPage } from './pages/details/view/view.page';
import { RecipeDetailsAddPage } from './pages/details/add/add.page';

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
    path: 'new',
    component: RecipeDetailsAddPage,
    canDeactivate: [CanDeactivateGuard]
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
    component: RecipeDetailsEditPage,
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
