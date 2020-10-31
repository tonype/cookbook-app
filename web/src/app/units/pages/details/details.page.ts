import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Unit } from '@units.models';
import { UnitsService } from '../../services/units.service';
import { DetailsMode } from '../../../shared/enums/details-mode.enum';
import { CookbookDialogConfirmDeleteComponent } from '../../../shared/components/dialog-confirm-delete.component';

@UntilDestroy()
@Component({
  selector: 'cookbook-units-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class UnitsDetailsPage implements OnInit {
  mode: DetailsMode;
  detailsMode = DetailsMode;
  originalUnit: Unit;
  unitDetailsForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private unitsService: UnitsService,
    private sb: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.data
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Data): void => {
        this.mode = !!data.unit ? DetailsMode.Edit : DetailsMode.Create;

        if (this.mode === DetailsMode.Edit) {
          this.originalUnit = data.unit;
        }

        this.unitDetailsForm = this.fb.group({
          name: [
            !!this.originalUnit ? this.originalUnit.name : '',
            Validators.required
          ]
        });
      });
  }

  save(unit: Unit): void {
    if (this.mode === DetailsMode.Edit) {
      unit._id = this.originalUnit._id;
    }

    const saveOperation = this.mode === DetailsMode.Create ?
      this.unitsService.create(unit) :
      this.unitsService.update(unit);

    saveOperation
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.sb.open(`Unit ${this.mode === DetailsMode.Edit ? 'updated' : 'created'}!`, 'Dismiss', {
          duration: 2000
        });

        this.router.navigate(['/units']);
      });
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(CookbookDialogConfirmDeleteComponent, {
      width: '300px'
    });

    dialogRef.afterClosed()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((deleteConfirmed) => {
        if (deleteConfirmed) {
          this.finalizeDelete();
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/units']);
  }

  private finalizeDelete() {
    this.unitsService.delete(this.originalUnit._id)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.sb.open('Unit deleted!', 'Dismiss', {
          duration: 2000
        });
        this.router.navigate(['/units']);
      });
  }
}
