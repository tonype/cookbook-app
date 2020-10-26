import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IngredientsService } from '../../services/ingredients.service';

@UntilDestroy()
@Component({
  selector: 'cookbook-ingredients-list-page',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class IngredientsListPage implements OnInit {
  ingredients: any[];

  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit(): void {
    this.ingredientsService.list()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((ingredients) => {
        this.ingredients = ingredients;
      });
  }
}
