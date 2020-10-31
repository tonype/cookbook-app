import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Tag } from '@tags.models';
import { TagsService } from '../../services/tags.service';
import { DetailsMode } from '../../../shared/enums/details-mode.enum';
import { CookbookDialogConfirmDeleteComponent } from '../../../shared/components/dialog-confirm-delete.component';

@UntilDestroy()
@Component({
  selector: 'cookbook-tags-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class TagsDetailsPage implements OnInit {
  mode: DetailsMode;
  detailsMode = DetailsMode;
  originalTag: Tag;
  tagDetailsForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tagsService: TagsService,
    private sb: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.data
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Data): void => {
        this.mode = !!data.tag ? DetailsMode.Edit : DetailsMode.Create;

        if (this.mode === DetailsMode.Edit) {
          this.originalTag = data.tag;
        }

        this.tagDetailsForm = this.fb.group({
          name: [
            !!this.originalTag ? this.originalTag.name : '',
            Validators.required
          ]
        });
      });
  }

  save(tag: Tag): void {
    if (this.mode === DetailsMode.Edit) {
      tag._id = this.originalTag._id;
    }

    const saveOperation = this.mode === DetailsMode.Create ?
      this.tagsService.create(tag) :
      this.tagsService.update(tag);

    saveOperation
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.sb.open(`Tag ${this.mode === DetailsMode.Edit ? 'updated' : 'created'}!`, 'Dismiss', {
          duration: 2000
        });

        this.router.navigate(['/tags']);
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
    this.router.navigate(['/tags']);
  }

  private finalizeDelete() {
    this.tagsService.delete(this.originalTag._id)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.sb.open('Tag deleted!', 'Dismiss', {
          duration: 2000
        });
        this.router.navigate(['/tags']);
      });
  }
}
