import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IngredientsService } from '../ingredients.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsResolver implements Resolve<any> {
  constructor(
    private readonly ingredientsService: IngredientsService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.ingredientsService.get(route.params.id);
  }
}
