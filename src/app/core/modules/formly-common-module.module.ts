import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  imports: [ 
    MatNativeDateModule,
    CommonModule,
    FormlyMatDatepickerModule,
    FormlyModule,
    FormlyMaterialModule,
    ReactiveFormsModule
],
  exports: [ 
    MatNativeDateModule,
    CommonModule,
    FormlyModule,
    FormlyMatDatepickerModule,
    FormlyMaterialModule,
    ReactiveFormsModule
]
})
export class FormlyCommonModule { }