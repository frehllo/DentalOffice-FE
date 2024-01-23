import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { ModuleserviceService } from '../../../services/moduleservice/moduleservice.service';
import { DotMenuComponent } from "../../../components/standalones/dot-menu/dot-menu.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
    selector: 'app-write-module',
    standalone: true,
    templateUrl: './write-module.component.html',
    styleUrl: './write-module.component.scss',
    imports: [ReactiveFormsModule, FormlyModule,FormlyMaterialModule, MatNativeDateModule,FormlyMatDatepickerModule,DotMenuComponent, MatButtonModule, MatIconModule]
})
export class WriteModuleComponent implements OnInit {

  constructor(private service : ModuleserviceService) { }

  data : any | null = null;
  form = new FormGroup({});
  title: string = "NO TITLE"
  model: any | null = null;
  fields: FormlyFieldConfig[] | null = null;
  options: FormlyFormOptions = { };

  ngOnInit() {
    const moduleId = history.state;
    this.data = this.service.getById(moduleId);
    this.options.updateInitialValue;
    console.log(this.data)
    //get model and config by receivedData.id with service
    this.setData();
  }

  write() {
    console.log(this.model)
  }

  setData() {
    if(this.data.model != null) {
      this.model = this.data.model;
    }
    if(this.data.fields != null) {
      this.fields = this.data.fields;
    }
  }

  save() {
    this.form.markAllAsTouched();
  }

  reset() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnInIt', this.model)
  }
}
