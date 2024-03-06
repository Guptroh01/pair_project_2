import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
  styleUrls: ['./edit-delete.component.css'], 
  imports: [MatDialogModule, MatIconModule],
  standalone: true
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
