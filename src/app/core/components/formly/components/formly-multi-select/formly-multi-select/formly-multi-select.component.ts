import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formly-multi-select',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, ReactiveFormsModule, FormlyModule, CommonModule],
  templateUrl: './formly-multi-select.component.html',
  styleUrl: './formly-multi-select.component.scss'
})
export class FormlyMultiSelectComponent extends FieldType<FieldTypeConfig> implements OnInit{

  fieldOptions: any[] | null = null;

  ngOnInit(): void {
    const options = this.field?.props?.options;
    if (Array.isArray(options)) {
      this.fieldOptions = options;
    } else if (options instanceof Observable) {
      options.subscribe({
        next: (data: any[]) => {
          this.fieldOptions = data;
        },
        error: (error: any) => {
          console.error('Error fetching options:', error);
        }
      });
    } else {
      console.error('Invalid options:', options);
    }
  }
}
