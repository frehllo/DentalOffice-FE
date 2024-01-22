import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { ModuleserviceService } from '../../../services/moduleservice/moduleservice.service';

@Component({
  selector: 'app-write-module',
  standalone: true,
  imports: [ReactiveFormsModule, FormlyModule],
  templateUrl: './write-module.component.html',
  styleUrl: './write-module.component.scss'
})
export class WriteModuleComponent implements OnInit {

  constructor(private service : ModuleserviceService) { }

  data : any | null = null;
  form = new FormGroup({});
  title: string = "NO TITLE"
  model: any | null = null;
  fields: FormlyFieldConfig[] | null = null;

  ngOnInit() {
    const moduleId = history.state;
    this.data = this.service.getById(moduleId)
    console.log(this.data)
    //get model and config by receivedData.id with service
    this.setData();
  }

  setData() {
    if(this.data.model != null) {
      this.model = this.data.model;
    }
    if(this.data.fields != null) {
      this.fields = this.data.fields;
    }
  }

  confirm() {
  }

  cancel() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnInIt', this.model)
  }
}
