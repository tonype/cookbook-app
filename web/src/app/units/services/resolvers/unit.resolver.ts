import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UnitsService } from '../units.service';
import { Unit } from '@units.models';

@Injectable({
  providedIn: 'root'
})
export class UnitResolver implements Resolve<Unit> {
  constructor(
    private readonly unitsService: UnitsService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Unit> {
    return this.unitsService.get(route.params.id);
  }
}
