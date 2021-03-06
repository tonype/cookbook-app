import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '@recipes.models';
import { RecipesService } from '../recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe> {
  constructor(
    private readonly recipesService: RecipesService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Recipe> {
    return this.recipesService.get(route.params.id);
  }
}
