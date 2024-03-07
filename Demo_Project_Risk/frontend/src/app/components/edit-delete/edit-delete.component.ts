import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef,MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { CreateRiskComponent } from '../create-risk/create-risk.component';
@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
  styleUrls: ['./edit-delete.component.css'], 
  imports: [MatDialogModule, MatIconModule],
  standalone: true
})
export class EditDeleteComponent {
  constructor(public dialogRef: MatDialogRef<EditDeleteComponent>,public dialog:MatDialog){}

  edit(){
    const dialogRef = this.dialog.open(CreateRiskComponent, {
      width: '500px'
    });
  }
  
  delete(){
    console.log("Delete was clicked!")
  }
}
