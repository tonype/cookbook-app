import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cookbook-dialog-confirm-delete',
  template: `
    <h1 mat-dialog-title>Confirm Delete</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to delete this?</p>
      <p>References to it will be removed from all recipes, and it will be permanently deleted.</p>
      <form [formGroup]="confirmDeleteForm">
        <mat-form-field>
          <mat-label>Type DELETE to confirm</mat-label>
          <input matInput formControlName="confirm" autocomplete="off" required />
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-raised-button color="primary" (click)="cancel()">Cancel</button>
      <button mat-raised-button color="warn" (click)="confirm()" [disabled]="!confirmDeleteForm.valid">
        Confirm
      </button>
    </div>
  `,
})
export class CookbookDialogConfirmDeleteComponent implements OnInit {
  confirmDeleteForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CookbookDialogConfirmDeleteComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.confirmDeleteForm = this.fb.group({
      confirm: ['', [Validators.required, Validators.pattern('^DELETE$')]]
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
