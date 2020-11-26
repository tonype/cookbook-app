/**
 * TODOS:
 * - Break this MVP beast up. an autocomplete component will help. Consider components by section?
 * - Strive for readability without abstracting everything too much.
 * - Fix the add icon for Directions. Something's misaligned.
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import numericQuantity from 'numeric-quantity';
import * as pluralize from 'pluralize';

import { DetailsMode } from '@cookbook.shared/enums/details-mode.enum';
import { CanComponentDeactivate } from '@cookbook.shared/interfaces/can-component-deactivate.interface';
import { RecipesService } from '../../../services/recipes.service';

import { Tag } from '@tags.models';
import { TagsService } from '@tags.services';
import { IngredientsService } from '@ingredients.services';
import { UnitsService } from '@units.services';
import { Recipe, RecipeDirection, RecipeIngredient } from '@recipes.models';
import { Ingredient } from '@ingredients.models';
import { Unit } from '@units.models';

@UntilDestroy()
@Component({
  selector: 'cookbook-recipe-details-change',
  templateUrl: './change.page.html',
  styleUrls: ['./change.page.scss']
})
export class RecipeDetailsChangePage implements OnInit, CanComponentDeactivate {
  recipe: Recipe;
  mode: DetailsMode;
  detailsMode = DetailsMode;

  recipeDetailsForm: FormGroup;
  addIngredientForm: FormGroup;

  tagTypeahead = new FormControl();
  searchTags$ = new Subject<string>();
  tagSearchResults$: Observable<Tag[]> = this.searchTags$.pipe(
    debounceTime(250),
    switchMap(tagName => {
      return tagName ? this.tagsService.list(tagName) : of([]);
    }),
    map((tags: Tag[]) => tags.filter((tag: Tag) => !this.recipeHasTag(tag)))
  );

  searchIngredients$ = new BehaviorSubject<string>(null);
  ingredientSearchResults$: Observable<Tag[]> = this.searchIngredients$.pipe(
    debounceTime(250),
    switchMap(ingredientName => {
      return ingredientName ? this.ingredientsService.list(ingredientName) : of([]);
    })
    // map((tags: Tag[]) => tags.filter((tag: Tag) => !this.recipeHasTag(tag)))
  );

  searchUnits$ = new BehaviorSubject<string>(null);
  unitSearchResults$: Observable<Tag[]> = this.searchUnits$.pipe(
    debounceTime(250),
    switchMap(unitName => {
      return unitName ? this.unitsService.list(unitName) : of([]);
    })
    // map((tags: Tag[]) => tags.filter((tag: Tag) => !this.recipeHasTag(tag)))
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private sb: MatSnackBar,
    private recipesService: RecipesService,
    private tagsService: TagsService,
    private ingredientsService: IngredientsService,
    private unitsService: UnitsService,
  ) {}

  get directionsFormArray(): FormArray {
    return this.recipeDetailsForm.get('directions') as FormArray;
  }

  get ingredientsFormArray(): FormArray {
    return this.recipeDetailsForm.get('ingredients') as FormArray;
  }

  get tagsFormArray(): FormArray {
    return this.recipeDetailsForm.get('tags') as FormArray;
  }

  ngOnInit(): void {
    this.route.data
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Data) => {
        this.recipe = data.recipe;
        this.initializeRecipeForm();
      });
  }

  addTag(event: MatAutocompleteSelectedEvent): void {
    const tag: Tag = event.option.value;

    this.tagsFormArray.push(
      this.fb.group({
        _id: [tag._id],
        name: [tag.name]
    }));

    this.tagTypeahead.setValue(null);
    this.searchTags();
  }

  searchTags(): void {
    this.searchTags$.next(this.tagTypeahead.value);
  }

  searchIngredients(name: string): void {
    this.searchIngredients$.next(name);
  }

  ingredientDisplay(ingredient: Ingredient): string {
    return ingredient ? ingredient.name : null;
  }

  searchUnits(name: string): void {
    this.searchUnits$.next(name);
  }

  unitDisplay(unit: Unit): string {
    return unit ? unit.name : null;
  }

  canDeactivate(): boolean {
    if (this.recipeDetailsForm.dirty || this.recipeDetailsForm.touched) {
      const result = window.confirm('Are you sure you want to leave this page? Any unsaved changes will be lost.');

      if (result) {
        this.sb.open('Recipe edit cancelled!', 'Dismiss', { duration: 2000 });
      }

      return result;
    }

    return true;
  }

  directionMoved(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.directionsFormArray.controls, event.previousIndex, event.currentIndex);
    this.reorderDirections();
  }

  addDirection(direction: RecipeDirection): void {
    this.directionsFormArray.push(
      this.fb.group({
        step: [direction.step, Validators.required],
        detail: [direction.detail, Validators.required]
      })
    );
  }

  addRecipeIngredient(ingredient: RecipeIngredient): void {
    this.ingredientsFormArray.push(
      this.fb.group({
        qty: [ingredient.qty, Validators.required],
        unit: [ingredient.unit, Validators.required],
        details: [ingredient.details, Validators.required]
      })
    );

    this.resetAddIngredientForm();
  }

  removeTag(index: number): void {
    if (window.confirm('Are you sure you want to remove this tag?')) {
      this.tagsFormArray.removeAt(index);
      this.markDirtyIfPristine();
    }
  }

  removeDirection(index: number): void {
    if (window.confirm('Are you sure you want to remove this direction?')) {
      this.directionsFormArray.removeAt(index);
      this.reorderDirections();
    }
  };

  removeIngredient(index: number): void {
    if (window.confirm('Are you sure you want to remove this ingredient?')) {
      this.ingredientsFormArray.removeAt(index);
    }
  };

  cancel(): void {
    this.router.navigate(['/recipes', this.recipe._id]);
  }

  save(recipe: Recipe): void {
    recipe.tags = (recipe.tags as Tag[]).map(tag => tag._id);
    recipe.ingredients = (recipe.ingredients as RecipeIngredient[]).map(ri => {
      ri.details = (ri.details as Ingredient)._id;
      ri.unit = (ri.unit as Unit)._id;
      return ri;
    });

    this.recipesService.update(recipe)
      .subscribe(() => {
        this.sb.open('Recipe updated!', 'Dismiss', {
          duration: 2000
        });

        // Need to do this so CanDeactivate doesn't fire.
        // TODO: think of alternative way of handling this.
        this.recipeDetailsForm.markAsPristine();
        this.recipeDetailsForm.markAsUntouched();

        this.router.navigate(['/recipes', recipe._id]);
      });
  }

  // TODO: make this a pipe
  getPluralizedUnit(ingredient: RecipeIngredient): void {
    const unit = (ingredient.unit as Unit);

    if (!unit.name) {
      return;
    }

    return numericQuantity(ingredient.qty) > 1 ? pluralize(unit.name) : unit.name;
  }

  private recipeHasTag(tag: Tag): boolean {
    return !!(this.tagsFormArray.value as Tag[]).find((t: Tag) => t._id === tag._id);
  }

  private initializeRecipeForm(): void {
    this.recipeDetailsForm = this.fb.group({
      _id: [this.recipe._id],
      name: [this.recipe.name, Validators.required],
      prepTime: [this.recipe.prepTime, Validators.required],
      cookTime: [this.recipe.cookTime, Validators.required],
      description: [this.recipe.description, Validators.required],
      notes: [this.recipe.notes],
      foundFrom: [this.recipe.foundFrom],
      tags: this.fb.array(this.recipe.tags),
      ingredients: this.fb.array([], Validators.minLength(1)),
      directions: this.fb.array([], Validators.minLength(1))
    });

    this.resetAddIngredientForm();

    this.recipe.directions.forEach(direction => {
      this.addDirection(direction);
    });

    this.recipe.ingredients.forEach(direction => {
      this.addIngredient(direction);
    });
  }

  private resetAddIngredientForm(): void {
    this.addIngredientForm = this.fb.group({
      qty: [1, Validators.required],
      unit: [null, Validators.required],
      details: [null, Validators.required],
    });
  }

  private addIngredient(ingredient: RecipeIngredient): void {
    this.ingredientsFormArray.push(
      this.fb.group({
        _id: [ingredient._id],
        qty: [ingredient.qty],
        unit: [ingredient.unit],
        details: [ingredient.details]
      })
    );
  }

  private reorderDirections(): void {
    this.directionsFormArray.controls.forEach((direction, index) => {
      direction.patchValue({ step: index + 1 });
    });

    this.markDirtyIfPristine();
  }

  private markDirtyIfPristine(): void {
    if (this.recipeDetailsForm.pristine) {
      this.recipeDetailsForm.markAsDirty();
    }
  }
}
