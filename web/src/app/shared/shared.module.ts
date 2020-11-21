import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { sharedGuards } from './guards';
import { sharedComponents } from './components';

// Not a fan of CoreModule being in here... revisit.
// Should we just have a Shared module? Get rid of Core?
// They feel functionally equivalent as of right now.
@NgModule({
  declarations: [...sharedComponents],
  imports: [
    CoreModule
  ],
  exports: [...sharedComponents],
  providers: [...sharedGuards]
})
export class SharedModule {}
