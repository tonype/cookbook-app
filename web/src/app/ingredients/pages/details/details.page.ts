import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'cookbook-ingredients-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class IngredientsDetailsPage implements OnInit {
  ingredient: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Data) => {
        this.ingredient = data.ingredient;
      });
  }
}
