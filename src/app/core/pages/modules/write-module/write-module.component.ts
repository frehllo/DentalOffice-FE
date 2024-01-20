import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-write-module',
  standalone: true,
  imports: [],
  templateUrl: './write-module.component.html',
  styleUrl: './write-module.component.scss'
})
export class WriteModuleComponent implements OnInit {

  constructor() { }

  data : any | null = null;
  form = new FormGroup({});
  title: string = "NO TITLE"
  model: any | null = null;
  fields: FormlyFieldConfig[] | null = null;

  ngOnInit() {
    const receivedData = history.state;

    //get model ang config by receivedData.id

    this.data = 
    {
      
    }

    if(this.data.model != null) {
      this.model = this.data.model;
    }
    if(this.data.fields != null) {
      this.fields = this.data.fields;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnInIt', this.model)
  }
}
