import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DataModalComponent } from '../data-modal/data-modal.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ToTrustedHtmlPipe } from '../../../../pipes/html-trusted.pipe';
import { MatButtonModule } from '@angular/material/button';

export interface DocumentConfig {
  name: string;
  content: string;
}

@Component({
  selector: 'app-module-preview-modal',
  standalone: true,
  imports: [MatStepperModule, MatDialogTitle, MatDialogActions, MatButtonModule, MatDialogClose, MatDialogModule, ToTrustedHtmlPipe],
  templateUrl: './module-preview-modal.component.html',
  styleUrl: './module-preview-modal.component.scss'
})
export class ModulePreviewModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DataModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  modules: DocumentConfig[] | null = null;

  ngOnInit(): void {
    console.log(this.data)
    //have to come from service
    this.modules = [
      {
        name: "Modulo 1",
        content: "<h1>Ciao</h1>"
      }
    ]
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  print(): any {
    this.dialogRef.close(true);
  }
}
