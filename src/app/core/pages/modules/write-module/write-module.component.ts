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

@Component({
  selector: 'app-write-module',
  standalone: true,
  templateUrl: './write-module.component.html',
  styleUrl: './write-module.component.scss',
  imports: [
    AgGridModule,
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
  constructor(private service: ModuleserviceService) {}

  data: any | null = null;
  form = new FormGroup({});
  title: string = 'NO TITLE';
  model: any = { personalData: {}, process: {} };
  processes: any[] = [];
  fields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions = {};
  rowData: any[] = [];
  colDefs : ColDef[] = [];

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
    if (this.data.model != null) {
      this.model = this.data.model;
    }
    if (this.data.form != null) {
      this.fields = this.data.form
    }
    if(this.data.grid.colDefs != null) {
      this.colDefs = this.data.grid.colDefs;
    }
    if(this.data.grid.data) {
      this.rowData = this.data.grid.data
    }
  }

  addProcess() {}

  save() {
    this.form.markAllAsTouched();
  }

  reset() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnInIt', this.model);
  }
}
