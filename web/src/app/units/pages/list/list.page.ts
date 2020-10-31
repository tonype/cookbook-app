import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Unit } from '@units.models';

@UntilDestroy()
@Component({
  selector: 'cookbook-units-list-page',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class UnitsListPage implements OnInit {
  units: Unit[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Data) => {
        this.units = data.units;
      });
  }
}
