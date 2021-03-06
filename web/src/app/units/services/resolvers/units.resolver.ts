import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UnitsService } from '../units.service';
import { Unit } from '@units.models';

@Injectable({
  providedIn: 'root'
})
export class UnitsResolver implements Resolve<Unit[]> {
  constructor(
    private readonly unitsService: UnitsService,
  ) { }

  resolve(): Observable<Unit[]> {
    return this.unitsService.list();
  }
}
