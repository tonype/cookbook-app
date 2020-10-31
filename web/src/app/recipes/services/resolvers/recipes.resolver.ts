import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '@recipes.models';
import { RecipesService } from '../recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(
    private readonly recipesService: RecipesService,
  ) { }

  resolve(): Observable<any> {
    return this.recipesService.list();
  }
}
