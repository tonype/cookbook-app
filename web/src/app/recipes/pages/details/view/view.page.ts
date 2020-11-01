import { Component } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Recipe } from '@recipes.models';

@UntilDestroy()
@Component({
  selector: 'cookbook-recipe-details-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss']
})
export class RecipeDetailsViewPage {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.data
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Data) => {
        this.recipe = data.recipe;
      });
  }

  edit(): void {
    this.router.navigate(['/recipes', this.recipe._id, 'edit']);
  }
}
