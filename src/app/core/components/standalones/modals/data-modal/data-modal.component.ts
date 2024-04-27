import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyCommonModule } from '../../../../modules/formly-common-module.module';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

export class DataModalPropr {
  title: string | null = null;
  model: any = {};
  fields: FormlyFieldConfig[] | null = null;
}
@Component({
  selector: 'app-data-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogActions, MatDialogClose, MatButtonModule, MatDialogModule, FormlyCommonModule, MatIconModule, MatNativeDateModule],
  templateUrl: './data-modal.component.html',
  styleUrl: './data-modal.component.scss'
})
export class DataModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DataModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  form = new FormGroup({});
  title: string = "NO TITLE"
  model: any = {};
  fields: FormlyFieldConfig[] = [];

  ngOnInit(): void {
    if (this.data.model != null) {
      this.model = this.data.model;
      if (this.model && this.model.materialProperties) {
        this.model.materialProperties = JSON.parse(this.model.materialProperties);
      }
    }
    if (this.data.fields != null) {
      this.fields = this.data.fields;
    }
    if (this.data.title != null) {
      this.title = this.data.title;
    }
  }

  cancel(): void {
    this.dialogRef.close({ success: false });
  }

  confirm(): any {
    this.dialogRef.close({ success: true, model: this.model });
  }
}
