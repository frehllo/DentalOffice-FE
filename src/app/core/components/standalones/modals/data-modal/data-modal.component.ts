import { Component, Inject, IterableChanges, KeyValueChanges, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyCommonModule } from '../../../../modules/formly-common-module.module';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { ModuleService } from '../../../../services/moduleservice/module.service';

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
    public moduleService: ModuleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  form = new FormGroup({}) as any;
  title: string = "NO TITLE"
  beforeModel: any = {};
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

  change(changes: SimpleChange) {
    var anyChanges = changes as any;
    if (this.beforeModel != anyChanges && this.fields != null && this.fields.length > 0 && this.fields[0].fieldGroup != null && this.fields[0].fieldGroup.length > 0 && this.fields[0].fieldGroup[0].key == "semiProductId") {
      if (this.beforeModel['metalMaterialId'] != anyChanges['metalMaterialId']) {
        this.moduleService.getLotsByMaterialId(anyChanges['metalMaterialId']).subscribe({
          next: (res: any) => {
            var index: number = this.fields[0].fieldGroup!.findIndex(item => item.key == "metalLotId" && item.type == "select");
            if (res.key != null && res.key['length'] > 0) {
              if (index > -1) {
                this.fields[0].fieldGroup![index].props!.options = res.key;
                this.form.controls['metalLotId'].value = res.key[0].value;
                this.model['metalLotId'] = res.key[0].value;
              }
            } else {
              this.fields[0].fieldGroup![index].props!.options = [];
              this.form.controls['metalLotId'].value = null;
              this.model['metalLotId'] = null;
            }
          },
          error: (e: any) => {
            console.log('error getting metal lots', e);
          }

        })
      }

      if (((this.beforeModel['colorId'] != anyChanges['colorId'] && anyChanges['dentinMaterialId'] != null) ||
        (this.beforeModel['dentinMaterialId'] != anyChanges['dentinMaterialId'] && anyChanges['colorId'] != null))) {
        this.moduleService.getLotsByMaterialIdAndColorId(anyChanges['dentinMaterialId'], anyChanges['colorId']).subscribe({
          next: (res: any) => {
            var dentinIndex: number = this.fields[0].fieldGroup!.findIndex(item => item.key == "dentinLotId" && item.type == "select");
            var enamelIndex: number = this.fields[0].fieldGroup!.findIndex(item => item.key == "enamelLotId" && item.type == "select");
            if (res['dentinLots'] != null && res['dentinLots'].length > 0) {
              if (dentinIndex > -1) {
                this.fields[0].fieldGroup![dentinIndex].props!.options = res['dentinLots'];
                this.form.controls['dentinLotId'].value = res['dentinLots'][0].value;
                this.model['dentinLotId'] = res['dentinLots'][0].value;
              }
            } else {
              if (dentinIndex > -1) {
                this.fields[0].fieldGroup![dentinIndex].props!.options = [];
                this.form.controls['dentinLotId'].value = null;
                this.model['dentinLotId'] = null;
              }
            }

            if (res['enamelLots'] != null && res['enamelLots'].length > 0) {
              if (enamelIndex > -1) {
                this.fields[0].fieldGroup![enamelIndex].props!.options = res['enamelLots'];
                this.form.controls['enamelLotId'].value = res['enamelLots'][0].value;
                this.model['enamelLotId'] = res['enamelLots'][0].value;
              }
            } else {
              if (enamelIndex > -1) {
                this.fields[0].fieldGroup![enamelIndex].props!.options = [];
                this.form.controls['enamelLotId'].value = null;
                this.model['enamelLotId'] = null;
              }
            }
          },
          error: (e: any) => {
            console.log('error getting dentin and enamel lots', e);
          }
        });
      }
    }

    this.beforeModel = anyChanges;
  }
}
