import { Component, Inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyFieldConfig } from '@ngx-formly/core';

export class DataModalPropr {
  title: string | null = null;
  model: any | null;
  fields: FormlyFieldConfig[] | null = null;
}
@Component({
  selector: 'app-data-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogActions, MatButtonModule, MatDialogModule, FormlyModule, FormlyMaterialModule, ReactiveFormsModule],
  templateUrl: './data-modal.component.html',
  styleUrl: './data-modal.component.scss'
})
export class DataModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DataModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  form = new FormGroup({});
  title: string = "NO TITLE"
  model: any | null = null;
  fields: FormlyFieldConfig[] | null = null;

  ngOnInit(): void {
    if(this.data.model != null) {
      this.model = this.data.model;
    }
    if(this.data.fields != null) {
      this.fields = this.data.fields;
    }
    if(this.data.title != null) {
      this.title = this.data.title;
    }
    console.log('ngOnInIt', this.fields)
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): any {
    this.dialogRef.close(this.model);
  }
}
