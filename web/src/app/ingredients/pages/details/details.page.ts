import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IngredientsService } from '../../services/ingredients.service';
import { DetailsMode } from '../../../shared/enums/details-mode.enum';
import { CookbookDialogConfirmDeleteComponent } from '../../../shared/components/dialog-confirm-delete.component';

@UntilDestroy()
@Component({
  selector: 'cookbook-ingredients-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class IngredientsDetailsPage implements OnInit {
  mode: DetailsMode;
  detailsMode = DetailsMode;
  originalIngredient: any;
  ingredientDetailsForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ingredientsService: IngredientsService,
    private sb: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.data
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Data): void => {
        this.mode = !!data.ingredient ? DetailsMode.Edit : DetailsMode.Create;

        if (this.mode === DetailsMode.Edit) {
          this.originalIngredient = data.ingredient;
        }

        this.ingredientDetailsForm = this.fb.group({
          name: [
            !!this.originalIngredient ? this.originalIngredient.name : '',
            Validators.required
          ]
        });
      });
  }

  save(ingredient: any): void {
    if (this.mode === DetailsMode.Edit) {
      ingredient.id = this.originalIngredient._id;
    }

    const saveOperation = this.mode === DetailsMode.Create ?
      this.ingredientsService.create(ingredient) :
      this.ingredientsService.update(ingredient);

    saveOperation
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.sb.open(`Ingredient ${this.mode === DetailsMode.Edit ? 'updated' : 'created'}!`, 'Dismiss', {
          duration: 2000
        });

        this.router.navigate(['/ingredients']);
      });
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(CookbookDialogConfirmDeleteComponent, {
      width: '300px'
    });

    dialogRef.afterClosed()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((deleteConfirmed) => {
        if (deleteConfirmed) {
          this.finalizeDelete();
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/ingredients']);
  }

  private finalizeDelete() {
    this.ingredientsService.delete(this.originalIngredient._id)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.sb.open('Ingredient deleted!', 'Dismiss', {
          duration: 2000
        });
        this.router.navigate(['/ingredients']);
      });
  }
}
