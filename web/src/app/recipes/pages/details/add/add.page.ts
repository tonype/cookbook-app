import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailsMode } from '@cookbook.shared/enums/details-mode.enum';
import { Recipe } from '@recipes.models';

@Component({
  selector: 'cookbook-recipe-details-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss']
})
export class RecipeDetailsAddPage {
  recipe: Recipe;
  mode: DetailsMode = DetailsMode.Edit;
  recipeFormDirtyOrTouched = false;

  constructor(
    private sb: MatSnackBar
  ) {}

  canDeactivate(): boolean {
    if (this.recipeFormDirtyOrTouched) {
      const result = window.confirm('Are you sure you want to leave this page? Any unsaved changes will be lost.');
      const snackBarMessage = 'Recipe add cancelled!';

      if (result) {
        this.sb.open(snackBarMessage, 'Dismiss', { duration: 2000 });
      }

      return result;
    }

    return true;
  }

  onRecipeCancelChanges(recipeFormDirtyOrTouched: boolean) {
    this.recipeFormDirtyOrTouched = recipeFormDirtyOrTouched;
  }
}
