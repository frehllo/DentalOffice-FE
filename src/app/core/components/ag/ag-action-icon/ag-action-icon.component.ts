import { ICellRendererParams } from 'ag-grid-community';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-action-icon',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './ag-action-icon.component.html',
  styleUrl: './ag-action-icon.component.scss',
})
export class AGActionIconComponent implements ICellRendererAngularComp {
  fontIcon: string = 'circle';

  agInit(params: ICellRendererParams): void {
    this.fontIcon = params.colDef!.cellRendererParams!.iconName;
  }

  refresh(params: ICellRendererParams): boolean {
    this.fontIcon = params.colDef!.cellRendererParams!.iconName;
    return true;
  }
}
