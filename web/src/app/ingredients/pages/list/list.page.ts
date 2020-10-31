import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Ingredient } from '@ingredients.models';

@UntilDestroy()
@Component({
  selector: 'cookbook-ingredients-list-page',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class IngredientsListPage implements OnInit {
  ingredients: Ingredient[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Data) => {
        this.ingredients = data.ingredients;
      });
  }
}
