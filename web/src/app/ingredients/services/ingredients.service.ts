import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class IngredientsService {
  private readonly rootUrl = `${environment.apiUrl}/ingredients`;

  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get(this.rootUrl);
  }

  get(id: string): Observable<any> {
    return this.http.get(`${this.rootUrl}/${id}`);
  }

  create(ingredient: any): Observable<any> {
    return this.http.post(`${this.rootUrl}`, ingredient);
  }

  update(ingredient: any): Observable<any> {
    return this.http.put(`${this.rootUrl}/${ingredient.id}`, ingredient);
  }

  delete(ingredientId: any): Observable<any> {
    return this.http.delete(`${this.rootUrl}/${ingredientId}`);
  }
}
