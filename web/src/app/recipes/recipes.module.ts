import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeListPage } from './pages/list/list.page';
import { RecipeDetailsPage } from './pages/details/details.page';

@NgModule({
  declarations: [RecipeListPage, RecipeDetailsPage],
  imports: [
    CoreModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule {}
