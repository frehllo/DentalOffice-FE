import { Component, OnInit } from '@angular/core';
import { FieldType, FormlyMaterialModule } from '@ngx-formly/material';
import { FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formly-autocomplete',
  standalone: true,
  imports: [
    MatInputModule,
    MatAutocompleteModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    CommonModule,
    MatInputModule
  ],
  template: `
    <input
      matInput
      [matAutocomplete]="auto"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="props.placeholder!"
      [errorStateMatcher]="errorStateMatcher"
    />
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let value of filter | async" [value]="value">
        {{ value }}
      </mat-option>
    </mat-autocomplete>
  `,
  styleUrl: './formly-autocomplete.component.scss',
})
export class FormlyAutocompleteComponent
  extends FieldType<FieldTypeConfig>
  implements OnInit
{
  filter: Observable<any> = null!;

  ngOnInit() {
    /* this.filter = this.formControl.valueChanges.pipe(
      startWith(''),
      switchMap((term) => this.props.options['filter'](term))
    ); */
  }
}
