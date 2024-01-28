import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { NgxColorsModule } from 'ngx-colors';

@Component({
  selector: 'app-formly-color-picker',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, FormlyModule, NgxColorsModule, CommonModule],
  templateUrl: './formly-color-picker.component.html',
  styleUrl: './formly-color-picker.component.scss'
})
export class FormlyColorPickerComponent extends FieldType<FieldTypeConfig>{
  colorPickerControls: "default" | "only-alpha" | "no-alpha" = "default";
  hideColorPicker: boolean = true;
  hideTextInput: boolean = true;
  color: string = this.field.defaultValue;
}
