import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-colored-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './colored-circle.component.html',
  styleUrl: './colored-circle.component.scss'
})
export class ColoredCircleComponent implements OnInit, ICellRendererAngularComp{
  
  @Input() value: string = '';
  @Input() height: number = 10;
  width : number = 0;

  ngOnInit(): void {
    this.width = this.height;
  }

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}
