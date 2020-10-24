import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitsService } from '../../services/units.service';

@Component({
  selector: 'cookbook-units-list-page',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class UnitsListPage implements OnInit {
  units: Observable<any[]>;

  constructor(private unitsService: UnitsService) { }

  ngOnInit(): void {
    this.units = this.unitsService.list();
  }
}
