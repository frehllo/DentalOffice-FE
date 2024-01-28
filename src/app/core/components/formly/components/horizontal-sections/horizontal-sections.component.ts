import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'app-horizontal-sections',
  standalone: true,
  imports: [FormlyModule],
  template : `
    <div *ngFor="let section of field.formGroup" class="row">
      <formly-field class="col-lg col-sm-12" [field]="section"></formly-field>
    <div>
  `,
  styleUrl: './horizontal-sections.component.scss'
})
export class HorizontalSectionsComponent extends FieldType<FieldTypeConfig> {

}
