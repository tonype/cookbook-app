import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';

import { RecipeListPage } from './pages/list/list.page';
import { RecipeDetailsViewPage } from './pages/details/view/view.page';
import { RecipeDetailsChangePage } from './pages/details/change/change.page';

@NgModule({
  declarations: [
    RecipeListPage,
    RecipeDetailsViewPage,
    RecipeDetailsChangePage
  ],
  imports: [
    CoreModule,
    SharedModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule {}
