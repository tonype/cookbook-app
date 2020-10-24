import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

const modules = [
  CommonModule,
  MatDividerModule,
  MatListModule,
  MatCardModule
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class CoreModule { }
