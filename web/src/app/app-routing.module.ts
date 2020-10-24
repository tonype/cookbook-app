import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    loadChildren: () => import('src/app/recipes/recipes.module').then(m => m.RecipesModule),
  },
  {
    path: 'ingredients',
    loadChildren: () => import('src/app/ingredients/ingredients.module').then(m => m.IngredientsModule),
  },
  {
    path: 'units',
    loadChildren: () => import('src/app/units/units.module').then(m => m.UnitsModule),
  },
  {
    path: 'tags',
    loadChildren: () => import('src/app/tags/tags.module').then(m => m.TagsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
