import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Ingredient } from '@ingredients.models';
import { IngredientsService } from '../ingredients.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsResolver implements Resolve<Ingredient[]> {
  constructor(
    private readonly ingredientsService: IngredientsService,
  ) { }

  resolve(): Observable<Ingredient[]> {
    return this.ingredientsService.list();
  }
}
