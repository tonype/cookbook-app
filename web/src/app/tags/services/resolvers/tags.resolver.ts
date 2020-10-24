import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TagsService } from '../tags.service';

@Injectable({
  providedIn: 'root'
})
export class TagsResolver implements Resolve<any> {
  constructor(
    private readonly tagsService: TagsService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.tagsService.get(route.params.id);
  }
}
