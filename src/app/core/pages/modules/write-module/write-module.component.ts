import { ColDef } from 'ag-grid-community';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FormlyFieldConfig,
  FormlyFormOptions
} from '@ngx-formly/core';
import { ModuleserviceService } from '../../../services/moduleservice/moduleservice.service';
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
1

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
    AGActionIconComponent
  ],
})
export class WriteModuleComponent implements OnInit {
  constructor(private service: ModuleserviceService, public dialog: MatDialog) { }

  data: any | null = null;
  personalDataForm = new FormGroup({});
  processForm = new FormGroup({});
  title: string = 'NO TITLE';
  model: any = { personalData: {}, process: {} };
  processes: any[] = [];
  personalDataFields: FormlyFieldConfig[] = [];
  processesFields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions = {};
  rowData: any[] = [];
  colDefs: ColDef[] = [];

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
    const moduleId = history.state;
    this.data = this.service.getById(moduleId);
    //get model and config by receivedData.id with service
    this.setData();
  }

  write() {
    console.log(this.model);
  }

  setData() {
      this.model = this.data.model;
      this.personalDataFields = this.data.form.personalDataForm;
      this.processesFields = this.data.form.processesForm;
      this.colDefs = this.data.grid.colDefs;
      this.rowData = this.data.grid.data;

      this.actionHeaders.forEach((element: ColDef) => {
        this.colDefs.push(element);
      });
  }

  save() {
    this.personalDataForm.markAllAsTouched();

    if(this.personalDataForm.valid)
    {
      //service per salvataggio
    }
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
      //service che aggiunge a db e fa get
      console.log(result)
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', this.model);
  }
}
