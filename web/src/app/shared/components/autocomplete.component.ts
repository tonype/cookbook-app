import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

// TODO: implement this!
@Component({
  selector: 'cookbook-autocomplete',
  template: `
    <!-- <mat-form-field class="example-full-width">
      <input type="text"
        placeholder="Search by Tag name"
        aria-label="Number"
        matInput
        [formControl]="tagTypeahead"
        (input)="searchTags()"
        [matAutocomplete]="auto">
      <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete" (optionSelected)="addTag($event)">
        <mat-option *ngFor="let tag of tagSearchResults$ | async" [value]="tag">
          {{ tag.name }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field> -->
  `
})
export class CookbookAutocompleteComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
