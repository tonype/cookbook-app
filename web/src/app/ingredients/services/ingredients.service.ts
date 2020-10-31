import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '@ingredients.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class IngredientsService {
  private readonly rootUrl = `${environment.apiUrl}/ingredients`;

  constructor(private http: HttpClient) {}

  list(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.rootUrl);
  }

  get(id: string): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.rootUrl}/${id}`);
  }

  create(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${this.rootUrl}`, ingredient);
  }

  update(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.rootUrl}/${ingredient._id}`, ingredient);
  }

  delete(ingredientId: string): Observable<Ingredient> {
    return this.http.delete<Ingredient>(`${this.rootUrl}/${ingredientId}`);
  }
}
