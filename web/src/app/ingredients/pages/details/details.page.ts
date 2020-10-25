import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IngredientsService } from '../../services/ingredients.service';

@UntilDestroy()
@Component({
  selector: 'cookbook-ingredients-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class IngredientsDetailsPage implements OnInit {
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
      .subscribe((data: Data) => {
        this.originalIngredient = data.ingredient;
        this.ingredientDetailsForm = this.fb.group({
          name: [this.originalIngredient.name, Validators.required]
        });
      });
  }

  save(ingredient: any): void {
    ingredient.id = this.originalIngredient._id;
    this.ingredientsService.update(ingredient)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.sb.open('Ingredient updated!', 'Dismiss', {
          duration: 2000
        });
        this.router.navigate(['/ingredients']);
      });
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(CookbookDialogConfirmDeleteComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(deleteConfirmed => {
      console.log(deleteConfirmed);
      if (deleteConfirmed) {
        this.ingredientsService.delete(this.originalIngredient._id)
          .subscribe(() => {
            this.sb.open('Ingredient deleted!', 'Dismiss', {
              duration: 2000
            });
            console.log('navigating')
            this.router.navigate(['/ingredients']);
          });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/ingredients']);
  }
}

@Component({
  selector: 'cookbook-dialog-confirm-delete',
  template: `
    <h1 mat-dialog-title>Confirm Delete</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to delete this?</p>
      <p>It will be removed from all recipes, and be permanently deleted.</p>
      <form [formGroup]="confirmDeleteForm">
        <mat-form-field>
          <mat-label>Type DELETE to confirm</mat-label>
          <input matInput formControlName="confirm" autocomplete="off" required />
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-raised-button color="primary" (click)="cancel()">Cancel</button>
      <button mat-raised-button color="warn" (click)="confirm()" [disabled]="!confirmDeleteForm.valid">
        Confirm
      </button>
    </div>
  `,
})
export class CookbookDialogConfirmDeleteComponent implements OnInit {
  confirmDeleteForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CookbookDialogConfirmDeleteComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.confirmDeleteForm = this.fb.group({
      confirm: ['', [Validators.required, Validators.pattern('^DELETE$')]]
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
