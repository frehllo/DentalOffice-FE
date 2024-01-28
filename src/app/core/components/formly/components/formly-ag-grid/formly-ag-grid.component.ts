import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FieldArrayType, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { AgGridModule } from 'ag-grid-angular';
import { FirstDataRenderedEvent, GridOptions, ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-formly-ag-grid',
  standalone: true,
  imports: [AgGridModule, CommonModule, FormlyModule, FormlyMaterialModule],
  template: `
    <div [ngStyle]="style">
      <ag-grid-angular
        style="width: 100%; height: 100%"
        [gridOptions]="gridOptions!"
        [rowData]="model"
        (firstDataRendered)="onFirstDataRendered($event)"
      >
      </ag-grid-angular>
    </div>
  `,
  styleUrl: './formly-ag-grid.component.scss',
})
export class FormlyAgGridComponent extends FieldArrayType implements OnInit {
  gridOptions: GridOptions | null = null;
  style: any = {};

  ngOnInit() {
    this.style = {
      width: this.props['width'],
      height: this.props['height'],
    };

    // set grid options and context of the parent formly field
    const gridOptions: GridOptions = this.props['gridOptions'] || {};
    gridOptions.context = {
      parentField: this.field,
    };

    this.gridOptions = gridOptions;
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }
}
