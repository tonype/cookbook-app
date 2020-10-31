import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Ingredient } from '@ingredients.models';
import { IngredientsService } from '../ingredients.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientResolver implements Resolve<Ingredient> {
  constructor(
    private readonly ingredientsService: IngredientsService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Ingredient> {
    return this.ingredientsService.get(route.params.id);
  }
}
