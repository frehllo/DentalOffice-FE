import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { NgxColorsModule } from 'ngx-colors';

@Component({
  selector: 'app-formly-color-picker',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, FormlyModule, NgxColorsModule],
  templateUrl: './formly-color-picker.component.html',
  styleUrl: './formly-color-picker.component.scss'
})
export class FormlyColorPickerComponent extends FieldType<FieldTypeConfig> implements OnInit{
  color? : ThemePalette;

  ngOnInit(): void {
    console.log(this.formControl)
  }
}
