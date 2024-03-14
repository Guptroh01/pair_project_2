import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.css']
})
export class DeleteAlertComponent {
  constructor(public dialogRef: MatDialogRef<DeleteAlertComponent>) {}


  confirm() {
    this.dialogRef.close(true);
  }
  cancel() {
    // Cancel the confirmation action
    this.dialogRef.close(false);
  }

}
