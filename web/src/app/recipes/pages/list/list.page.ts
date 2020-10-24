import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'cookbook-recipe-list-page',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class RecipeListPage implements OnInit {
  recipes: Observable<any[]>;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipes = this.recipesService.list();
  }
}
