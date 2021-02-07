import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CanComponentDeactivate } from '@cookbook.shared/interfaces/can-component-deactivate.interface';
import { DetailsMode } from '@cookbook.shared/enums/details-mode.enum';
import { Recipe } from '@recipes.models';

@UntilDestroy()
@Component({
  selector: 'cookbook-recipe-details-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss']
})
export class RecipeDetailsEditPage implements OnInit, CanComponentDeactivate {
  recipe: Recipe;
  mode: DetailsMode = DetailsMode.Edit;
  recipeFormDirtyOrTouched = false;

  constructor(
    private route: ActivatedRoute,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Data) => {
        this.recipe = data.recipe;
      });
  }

  canDeactivate(): boolean {
    if (this.recipeFormDirtyOrTouched) {
      const result = window.confirm('Are you sure you want to leave this page? Any unsaved changes will be lost.');
      const snackBarMessage = 'Recipe edit cancelled!';

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
