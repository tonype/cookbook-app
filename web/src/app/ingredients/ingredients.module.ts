import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsListPage } from './pages/list/list.page';
import { IngredientsDetailsPage } from './pages/details/details.page';

@NgModule({
  declarations: [IngredientsListPage, IngredientsDetailsPage],
  imports: [
    CoreModule,
    SharedModule,
    IngredientsRoutingModule
  ]
})
export class IngredientsModule {}
