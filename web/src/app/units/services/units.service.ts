import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class UnitsService {
  private readonly rootUrl = `${environment.apiUrl}/units`;

  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get(this.rootUrl);
  }

  get(id: string): Observable<any> {
    return this.http.get(`${this.rootUrl}/${id}`);
  }
}
