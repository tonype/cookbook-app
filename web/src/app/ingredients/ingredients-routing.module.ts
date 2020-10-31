import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngredientsListPage } from './pages/list/list.page';
import { IngredientsDetailsPage } from './pages/details/details.page';
import { IngredientResolver } from './services/resolvers/ingredient.resolver';
import { IngredientsResolver } from './services/resolvers/ingredients.resolver';

const routes: Routes = [
  {
    path: '',
    component: IngredientsListPage,
    resolve: {
      ingredients: IngredientsResolver
    }
  },
  {
    path: 'new',
    component: IngredientsDetailsPage
  },
  {
    path: ':id',
    component: IngredientsDetailsPage,
    resolve: {
      ingredient: IngredientResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientsRoutingModule { }
