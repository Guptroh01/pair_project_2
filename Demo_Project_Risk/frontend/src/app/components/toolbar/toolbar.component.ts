import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateRiskComponent } from '../create-risk/create-risk.component';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,MatIconModule, MatFormFieldModule, MatSelectModule, MatMenuModule],
})


export class ToolbarComponent {

  constructor(public dialog: MatDialog) {}


  openCreateRiskDialog(): void {
  const dialogRef = this.dialog.open(CreateRiskComponent, {
    width: '500px'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result,"toolbar data")
  })
  }
}
