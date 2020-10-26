import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UnitsService } from '../../services/units.service';

@UntilDestroy()
@Component({
  selector: 'cookbook-units-list-page',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class UnitsListPage implements OnInit {
  units: any[];

  constructor(private unitsService: UnitsService) { }

  ngOnInit(): void {
    this.unitsService.list()
    .pipe(
      untilDestroyed(this)
    )
    .subscribe((units) => {
      this.units = units;
    });
  }
}
