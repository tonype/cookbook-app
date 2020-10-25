import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { CookbookDialogConfirmDeleteComponent } from './components/dialog-confirm-delete.component';

// Not a fan of CoreModule being in here... revisit.
@NgModule({
  declarations: [CookbookDialogConfirmDeleteComponent],
  imports: [
    CoreModule
  ],
  exports: [
    CookbookDialogConfirmDeleteComponent
  ]
})
export class SharedModule {}
