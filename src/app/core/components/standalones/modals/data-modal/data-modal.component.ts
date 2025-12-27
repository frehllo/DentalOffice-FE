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
    const anyChanges = changes as any;

    if (!this.fields || !this.fields[0]?.fieldGroup || this.fields[0].fieldGroup.length === 0) {
      return;
    }

    const firstField = this.fields[0].fieldGroup[0];
    if (firstField.key !== "dentals") {
      return;
    }

    const updateFieldLogic = (fieldKey: string, options: any[]) => {
      const fieldGroup = this.fields[0].fieldGroup;
      const field = fieldGroup!.find(item => item.key === fieldKey);
      
      if (field && field.props) {
        field.props.options = options;
        
        const defaultValue = (options && options.length > 0) ? options[1].value : null;

        if (this.form.controls[fieldKey]) {
          this.form.controls[fieldKey].patchValue(defaultValue);
        }
        
        this.model[fieldKey] = defaultValue;
      }
    };

    // --- LOGICA 1: METAL MATERIAL ---
    if (this.beforeModel['metalMaterialId'] !== anyChanges['metalMaterialId']) {
      const metalId = anyChanges['metalMaterialId'];
      if (metalId) {
        this.moduleService.getLotsByMaterialId(metalId).subscribe({
          next: (res: any) => updateFieldLogic('metalLotId', res.key || []),
          error: (e) => console.error('Error fetching metal lots', e)
        });
      } else {
        updateFieldLogic('metalLotId', []);
      }
    }

    // --- LOGICA 2: DISK MATERIAL ---
    if (this.beforeModel['diskMaterialId'] !== anyChanges['diskMaterialId']) {
      const diskId = anyChanges['diskMaterialId'];
      if (diskId) {
        this.moduleService.getLotsByMaterialId(diskId).subscribe({
          next: (res: any) => updateFieldLogic('diskLotId', res.key || []),
          error: (e) => console.error('Error fetching disk lots', e)
        });
      } else {
        updateFieldLogic('diskLotId', []);
      }
    }

    // --- LOGICA 3: DENTIN MATERIAL & COLOR (Insieme) ---
    const colorChanged = this.beforeModel['colorId'] !== anyChanges['colorId'];
    const dentinChanged = this.beforeModel['dentinMaterialId'] !== anyChanges['dentinMaterialId'];

    if (colorChanged || dentinChanged) {
      const dId = anyChanges['dentinMaterialId'];
      const cId = anyChanges['colorId'];

      // Eseguiamo la chiamata solo se abbiamo entrambi i valori necessari
      if (dId && cId) {
        this.moduleService.getLotsByMaterialIdAndColorId(dId, cId).subscribe({
          next: (res: any) => {
            updateFieldLogic('dentinLotId', res['dentinLots'] || []);
            updateFieldLogic('enamelLotId', res['enamelLots'] || []);
          },
          error: (e) => console.error('Error fetching dentin/enamel lots', e)
        });
      } else {
        // Se uno dei due manca, svuotiamo i lotti
        updateFieldLogic('dentinLotId', []);
        updateFieldLogic('enamelLotId', []);
      }
    }
    
    this.beforeModel = { ...anyChanges };
  }
}
