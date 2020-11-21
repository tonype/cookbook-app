import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tag } from '@tags.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class TagsService {
  private readonly rootUrl = `${environment.apiUrl}/tags`;

  constructor(private http: HttpClient) {}

  list(name?: string): Observable<Tag[]> {
    let url = this.rootUrl;
    url += name ? `?name=${name}` : '';

    return this.http.get<Tag[]>(url);
  }

  get(id: string): Observable<Tag> {
    return this.http.get<Tag>(`${this.rootUrl}/${id}`);
  }

  create(tag: any): Observable<Tag> {
    return this.http.post<Tag>(`${this.rootUrl}`, tag);
  }

  update(tag: any): Observable<Tag> {
    return this.http.put<Tag>(`${this.rootUrl}/${tag.id}`, tag);
  }

  delete(tagId: any): Observable<Tag> {
    return this.http.delete<Tag>(`${this.rootUrl}/${tagId}`);
  }
}
