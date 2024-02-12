import { ColDef } from 'ag-grid-community';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { ModuleserviceService } from '../../../services/moduleservice/moduleservice.service';
import { DotMenuComponent } from '../../../components/standalones/dot-menu/dot-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { DataModalComponent } from '../../../components/standalones/modals/data-modal/data-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-write-module',
  standalone: true,
  templateUrl: './write-module.component.html',
  styleUrl: './write-module.component.scss',
  imports: [
    AgGridModule,
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
    DotMenuComponent,
    MatButtonModule,
    MatIconModule,
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
  }

  save() {
    this.personalDataForm.markAllAsTouched();
  }

  reset() {
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
      console.log('closed data',result)
      //service che aggiunge a db e fa get
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', this.model);
  }
}
