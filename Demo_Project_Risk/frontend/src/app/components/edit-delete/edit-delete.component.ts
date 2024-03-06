import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
  styleUrls: ['./edit-delete.component.css']
})
export class EditDeleteComponent {
  constructor(public dialogRef: MatDialogRef<EditDeleteComponent>){}

  edit(){
    console.log("Edit was clicked!")
  }
  
  delete(){
    console.log("Delete was clicked!")
  }
}
