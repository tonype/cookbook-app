import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsListPage } from './pages/list/list.page';
import { IngredientsDetailsPage } from './pages/details/details.page';
import { CookbookDialogConfirmDeleteComponent } from './pages/details/details.page';

@NgModule({
  declarations: [IngredientsListPage, IngredientsDetailsPage, CookbookDialogConfirmDeleteComponent],
  imports: [
    CoreModule,
    IngredientsRoutingModule
  ]
})
export class IngredientsModule {}
