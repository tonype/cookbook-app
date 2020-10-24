import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UnitsService } from '../units.service';

@Injectable({
  providedIn: 'root'
})
export class UnitsResolver implements Resolve<any> {
  constructor(
    private readonly unitsService: UnitsService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.unitsService.get(route.params.id);
  }
}
