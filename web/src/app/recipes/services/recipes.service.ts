import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import * as pluralize from 'pluralize';
import { map } from 'rxjs/operators';
import { Recipe, RecipeIngredient } from '@recipes.models';
import { Ingredient } from '@ingredients.models';
import { Unit } from '@units.models';

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  private readonly rootUrl = `${environment.apiUrl}/recipes`;

  constructor(private http: HttpClient) {}

  list(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.rootUrl);
  }

  get(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.rootUrl}/${id}`)
      .pipe(
        map((recipe: Recipe) => {
          // TODO: move to server?
          recipe.ingredients.forEach((i: RecipeIngredient) => {
            (i.details as Ingredient).name = (i.details as Ingredient).name.toLowerCase();
            (i.unit as Unit).name = this.pluralizeUnit((i.unit as Unit).name, i.qty);
          });
          return recipe;
        })
      );
  }

  update(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.rootUrl}/${recipe._id}`, recipe);
  }

  private pluralizeUnit(unitName: string, qty: number): string {
    return pluralize(unitName, qty);
  }
}
