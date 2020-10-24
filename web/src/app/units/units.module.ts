import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { UnitsRoutingModule } from './units-routing.module';
import { UnitsListPage } from './pages/list/list.page';
import { UnitsDetailsPage } from './pages/details/details.page';

@NgModule({
  declarations: [UnitsListPage, UnitsDetailsPage],
  imports: [
    CoreModule,
    UnitsRoutingModule
  ]
})
export class UnitsModule {}
