import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipesService } from '../recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<any> {
  constructor(
    private readonly recipesService: RecipesService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.recipesService.get(route.params.id);
  }
}
