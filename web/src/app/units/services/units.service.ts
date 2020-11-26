import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Unit } from '@units.models';

@Injectable({
  providedIn: "root"
})
export class UnitsService {
  private readonly rootUrl = `${environment.apiUrl}/units`;

  constructor(private http: HttpClient) {}

  list(name?: string): Observable<Unit[]> {
    let url = this.rootUrl;
    url += name ? `?name=${name}` : '';

    return this.http.get<Unit[]>(url);
  }

  get(id: string): Observable<Unit> {
    return this.http.get<Unit>(`${this.rootUrl}/${id}`);
  }

  create(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(`${this.rootUrl}`, unit);
  }

  update(unit: Unit): Observable<Unit> {
    return this.http.put<Unit>(`${this.rootUrl}/${unit._id}`, unit);
  }

  delete(unitId: string): Observable<Unit> {
    return this.http.delete<Unit>(`${this.rootUrl}/${unitId}`);
  }
}
