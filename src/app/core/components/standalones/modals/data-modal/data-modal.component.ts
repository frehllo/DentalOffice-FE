import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyCommonModule } from '../../../../modules/formly-common-module.module';

export class DataModalPropr {
  title: string | null = null;
  model: any | null;
  fields: FormlyFieldConfig[] | null = null;
}
@Component({
  selector: 'app-data-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogActions, MatDialogClose, MatButtonModule, MatDialogModule, FormlyCommonModule],
  templateUrl: './data-modal.component.html',
  styleUrl: './data-modal.component.scss'
})
export class DataModalComponent implements OnInit, OnChanges {
  constructor(
    public dialogRef: MatDialogRef<DataModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  form = new FormGroup({});
  title: string = "NO TITLE"
  model: any = {};
  fields: FormlyFieldConfig[] = [];

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
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnInIt', this.model)
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): any {
    this.dialogRef.close(this.model);
  }
}
