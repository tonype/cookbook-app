import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { TagsRoutingModule } from './tags-routing.module';
import { TagsListPage } from './pages/list/list.page';
import { TagsDetailsPage } from './pages/details/details.page';

@NgModule({
  declarations: [TagsListPage, TagsDetailsPage],
  imports: [
    CoreModule,
    TagsRoutingModule
  ]
})
export class TagsModule {}
