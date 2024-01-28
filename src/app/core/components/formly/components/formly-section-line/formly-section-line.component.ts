import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-section-line',
  standalone: true,
  imports: [ReactiveFormsModule, FormlyModule],
  templateUrl: './formly-section-line.component.html',
  styleUrl: './formly-section-line.component.scss'
})
export class FormlySectionLineComponent extends FieldType<FieldTypeConfig> {

}
