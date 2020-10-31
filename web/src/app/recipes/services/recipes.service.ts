import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as pluralize from 'pluralize';
import { map } from 'rxjs/operators';
import { Recipe } from '@recipes.models';
import { environment } from '../../../environments/environment';

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
          recipe.ingredients.forEach(i => {
            i.details.name = i.details.name.toLowerCase();
            i.unit.name = this.pluralizeUnit(i.unit.name, i.qty);
          });
          return recipe;
        })
      );
  }

  private pluralizeUnit(unitName: string, qty: number): string {
    return pluralize(unitName, qty);
  }
}
