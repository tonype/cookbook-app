import { Component } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as pluralize from 'pluralize';
import numericQuantity from 'numeric-quantity';
import { Recipe, RecipeIngredient } from '@recipes.models';
import { Unit } from '@units.models';

@UntilDestroy()
@Component({
  selector: 'cookbook-recipe-details-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss']
})
export class RecipeDetailsViewPage {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.data
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Data) => {
        this.recipe = data.recipe;
      });
  }

  edit(): void {
    this.router.navigate(['/recipes', this.recipe._id, 'edit']);
  }

  // TODO: make this a pipe
  getPluralizedUnit(ingredient: RecipeIngredient): void {
    const unit = (ingredient.unit as Unit);
    return numericQuantity(ingredient.qty) > 1 ? pluralize(unit.name) : unit.name;
  }
}
