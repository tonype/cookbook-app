import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Tag } from '@tags.models';
import { TagsService } from '../tags.service';

@Injectable({
  providedIn: 'root'
})
export class TagsResolver implements Resolve<Tag[]> {
  constructor(
    private readonly tagsService: TagsService,
  ) { }

  resolve(): Observable<Tag[]> {
    return this.tagsService.list();
  }
}
