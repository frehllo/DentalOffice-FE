import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogActions, MatDialogModule, MatDialogClose, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogActions, MatButtonModule, MatDialogModule, MatDialogClose],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})

export class ConfirmModalComponent implements OnInit{
    constructor(
      public dialogRef: MatDialogRef<ConfirmModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}
  
    ngOnInit(): void {
      
    }

    cancel(): void {
      this.dialogRef.close(false);
    }

    confirm(): void {
      this.dialogRef.close(true);
    }
}
