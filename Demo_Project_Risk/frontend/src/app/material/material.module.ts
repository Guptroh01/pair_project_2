import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {A11yModule} from '@angular/cdk/a11y';
import {Sort, MatSortModule} from '@angular/material/sort';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule,MatIcon } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule, matSelectAnimations } from '@angular/material/select';
import {MatChipsModule, MatChipInput} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import { MatTable } from '@angular/material/table';

const MaterialUI = [
  MatButtonModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatTableModule,
  DragDropModule,
  ScrollingModule,
  CdkTableModule,
  CdkTreeModule,
  A11yModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatSelectModule,
  MatDialogModule,
  MatChipsModule,
  MatMenuModule,
];


@NgModule({
  imports: [MaterialUI],
  exports:[MaterialUI],
  
})

export class MaterialModule { }
