import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IngredientsService } from '../../services/ingredients.service';

@Component({
  selector: 'cookbook-ingredients-list-page',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class IngredientsListPage implements OnInit {
  ingredients: Observable<any[]>;

  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit(): void {
    this.ingredients = this.ingredientsService.list();
  }
}
