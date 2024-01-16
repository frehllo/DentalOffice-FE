import { ICellRendererParams, GridReadyEvent } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ag-colored-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ag-colored-circle.component.html',
  styleUrl: './ag-colored-circle.component.scss',
})
export class AGColoredCircle implements ICellRendererAngularComp {
  public value!: string;

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}
