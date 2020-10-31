import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Recipe } from '@recipes.models';

@UntilDestroy()
@Component({
  selector: 'cookbook-recipe-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class RecipeDetailsPage implements OnInit {
  recipe: Recipe;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Data) => {
        this.recipe = data.recipe;
      });
  }
}
