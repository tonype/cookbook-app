import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Tag } from '@tags.models';
import { TagsService } from '../tags.service';

@Injectable({
  providedIn: 'root'
})
export class TagResolver implements Resolve<Tag> {
  constructor(
    private readonly tagsService: TagsService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Tag> {
    return this.tagsService.get(route.params.id);
  }
}
