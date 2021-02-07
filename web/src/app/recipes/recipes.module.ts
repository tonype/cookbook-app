import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';

import { RecipeListPage } from './pages/list/list.page';
import { RecipeDetailsViewPage } from './pages/details/view/view.page';
import { RecipeDetailsEditPage } from './pages/details/edit/edit.page';
import { RecipeDetailsAddPage } from './pages/details/add/add.page';

import { RecipeFormComponent } from './components/recipe-form.component';

@NgModule({
  declarations: [
    RecipeListPage,
    RecipeDetailsViewPage,
    RecipeDetailsEditPage,
    RecipeDetailsAddPage,
    RecipeFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule {}
