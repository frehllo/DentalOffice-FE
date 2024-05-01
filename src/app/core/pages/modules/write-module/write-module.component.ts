import { ColDef } from 'ag-grid-community';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FormlyFieldConfig,
  FormlyFormOptions
} from '@ngx-formly/core';
import { ModuleService } from '../../../services/moduleservice/module.service';
import { DotMenuComponent } from '../../../components/standalones/dot-menu/dot-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgGridModule } from 'ag-grid-angular';
import { DataModalComponent } from '../../../components/standalones/modals/data-modal/data-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AGActionIconComponent } from '../../../components/ag/ag-action-icon/ag-action-icon.component';
import { ConfirmModalComponent } from '../../../components/standalones/modals/confirm-modal/confirm-modal.component';
import { FormlyCommonModule } from '../../../modules/formly-common-module.module';
import { ModulePreviewModalComponent } from '../../../components/standalones/modals/module-preview-modal/module-preview-modal.component';
import { LoadingComponent } from '../../../components/standalones/loading/loading.component';
import * as moment from 'moment';
import { AGColoredCircle } from '../../../components/ag/ag-colored-circle/ag-colored-circle.component';
import { AGType } from '../../../components/ag/AGType';

@Component({
  selector: 'app-write-module',
  standalone: true,
  templateUrl: './write-module.component.html',
  styleUrl: './write-module.component.scss',
  imports: [
    AgGridModule,
    FormlyCommonModule,
    DotMenuComponent,
    MatButtonModule,
    MatIconModule,
    AGActionIconComponent,
    LoadingComponent
  ],
})
export class WriteModuleComponent implements OnInit {
  constructor(private service: ModuleService, public dialog: MatDialog) { }

  data: any | null = null;
  personalDataForm = new FormGroup({});
  processesForm = new FormGroup({});
  title: string = 'NO TITLE';
  model: any = {};
  personalDataFields: FormlyFieldConfig[] = [];
  processesFields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions = {};
  gridApi : any | null = null;
  rowData: any[] = [];
  colDefs: ColDef[] = [];
  isLoading: boolean = false;
  actualRandomIndex : number = 0;

  onGridReady(params : any) {
    this.gridApi = params.api;
  }

  actionHeaders: ColDef[] = [
    {
      field: 'Edit',
      cellRenderer: /* eval(" */AGActionIconComponent/* ") */, //CAUTION - Da tenere a mente questo codice!!!!!!!!
      cellRendererParams: {
        iconName: 'edit',
      },
      onCellClicked: (event) => this.openProcess(event),
      resizable : false,
    },
    {
      field: 'Delete',
      cellRenderer: /* eval(" */AGActionIconComponent/* ") */, //CAUTION - Da tenere a mente questo codice!!!!!!!!
      cellRendererParams: {
        iconName: 'delete',
      },
      onCellClicked: (event) => this.deleteProcess(event),
      resizable : false
    },
  ];

  ngOnInit() {
    this.isLoading = true;

    const moduleId = history.state.id;
    this.service.getConfiguration().subscribe({
      next: (res: any) => {console.log('res',res)
        this.personalDataFields = res.personalDataForm;
        this.processesFields = res.processesForm;
        this.colDefs =
        res.grid.map((_ : any) => ({
          field: _.field,
          cellRenderer: _.cellRenderer == AGType[0] ? AGColoredCircle : null,
        })) ?? [];

        this.actionHeaders.forEach(element => {
          this.colDefs.push(element)
        });
      },
      error: (e: any) => {
        console.log('error getting modules configuration', e);
        this.isLoading = false;
      }
    });

    this.service.get(moduleId).subscribe({
      next : (res : any) =>{
        this.model = res;

        if(res.deliveryDate != null) {
          this.model.deliveryDate = moment.utc(res.deliveryDate).local().format('YYYY-MM-DD');
        }
    
        if(res.prescriptionDate != null) {
          this.model.prescriptionDate = moment.utc(res.prescriptionDate).local().format('YYYY-MM-DD');
        }

        this.rowData = res.processes;
      },
      error: (e : any) => {
        console.log('error getting module', e);
        this.isLoading = false;
      }
    })

    this.isLoading = false;
    this.setAction();
  }

  setAction() {
      this.actionHeaders.forEach((element: ColDef) => {
        this.colDefs.push(element);
      });
  }

  save() {
    this.isLoading = true;
    
    this.personalDataForm.markAllAsTouched();

    if(this.personalDataForm.valid)
    {
      const moduleId = history.state.id;

      var module : any = this.model;
      var processToSave : any[] = this.rowData;
      processToSave.forEach((element : any) => {
        element.color = null;
        element.dentinMaterial = null;
        element.metalMaterial = null;
        element.moduleId = moduleId;
      });

      module["processes"] = processToSave;

      this.service.update(moduleId, module).subscribe({
        next: (res: any) => {
          this.model = res;
        },
        error: (e: any) => {
          console.log('error saving module', e);
          this.isLoading = false;
        }
      });
    }

    this.isLoading = false;
  }

  reset() {
    this.personalDataForm.reset();
  }

  print() {
    if(this.personalDataForm.valid) {
      const dialogPreviewRef = this.dialog.open(ModulePreviewModalComponent, {
        data: this.model
      });
      dialogPreviewRef.afterClosed().subscribe((result: any) => {
        //service che aggiunge a db e fa get
        console.log(result)
      });
    }
  }

  openProcess(event?: any) {
    const dialogRef = this.dialog.open(DataModalComponent, {
      data:
      {
        title: event != null ? 'Edit' : 'Add',
        fields: this.processesFields,
        model : event != null ? event.data : null
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.success && result.model != null && event == null) {
        this.actualRandomIndex++;
        result.model.actualIndex = this.actualRandomIndex;
        this.rowData.push(result.model);
      }else if(result && result.success && result.model != null && event != null) {
        var toEditIndex : number = this.rowData.findIndex(e => e.actualIndex != null && e.actualIndex == event.actualIndex)
        this.rowData[toEditIndex] = result.model;
      }else if(result && result.success && result.model != null && event != null && event['id'] != null) {
        var toEditIndex : number = this.rowData.findIndex(e => e.id != null && e.id == event.id)
        this.rowData[toEditIndex] = result.model;
      }
      
      this.gridApi.setRowData(this.rowData);
    });
  }

  deleteProcess(event: any) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { title: 'Delete?' }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result == true && event.data != null && event.data["id"] != null) {
        const indexToRemove = this.rowData!.findIndex(item => item.id == event.data["id"]);
        if (indexToRemove > -1) {
          const newArray = this.rowData!.slice(0, indexToRemove).concat(this.rowData!.slice(indexToRemove + 1));
          this.rowData = newArray;
        }
      }
    });
  }
}
