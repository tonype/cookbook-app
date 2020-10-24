import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as pluralize from 'pluralize';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  private readonly rootUrl = `${environment.apiUrl}/recipes`;

  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get(this.rootUrl);
  }

  get(id: string): Observable<any> {
    return this.http.get(`${this.rootUrl}/${id}`)
      .pipe(
        map((recipe: any) => {
          // TODO: move to server?
          recipe.ingredients.forEach(i => i.unit.name = this.pluralizeUnit(i.unit.name, i.qty));
          return recipe;
        })
      );
  }

  private pluralizeUnit(unitName: string, qty: number): string {
    return pluralize(unitName, qty);
  }
}
