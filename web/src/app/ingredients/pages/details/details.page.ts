import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private sb: MatSnackBar
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

  cancel(): void {
    this.router.navigate(['/ingredients']);
  }
}
