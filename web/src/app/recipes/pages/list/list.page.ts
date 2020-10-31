import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Recipe } from '@recipes.models';

@UntilDestroy()
@Component({
  selector: 'cookbook-recipe-list-page',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class RecipeListPage implements OnInit {
  recipes: Recipe[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Data) => {
        this.recipes = data.recipes;
      });
  }
}
