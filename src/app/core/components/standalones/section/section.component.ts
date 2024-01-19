import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Section } from '../../../interfaces/section';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DataserviceService } from '../../../services/dataservice/dataservice.service';
import { AgActionIconComponent } from '../../ag/ag-action-icon/ag-action-icon.component';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component'; import {
  MatDialog
} from '@angular/material/dialog';
import { DataModalComponent } from '../modals/data-modal/data-modal.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [
    AgGridModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    AgActionIconComponent
  ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent implements OnInit, OnChanges {
  @Input() section: Section = { title: 'NOT FOUND', route: '/not-found' };

  actionHeaders: ColDef[] = [
    {
      field: 'Edit',
      cellRenderer: /* eval(" */AgActionIconComponent/* ") */, //CAUTION - Da tenere a mente questo codice!!!!!!!!
      cellRendererParams: {
        iconName: 'edit',
      },
      onCellClicked: (event) => this.data(event)
    },
    {
      field: 'Delete',
      cellRenderer: /* eval(" */AgActionIconComponent/* ") */, //CAUTION - Da tenere a mente questo codice!!!!!!!!
      cellRendererParams: {
        iconName: 'delete',
      },
      onCellClicked: (event) => this.delete(event)
    },
  ];
  activeLink: string = '';
  colDefs: ColDef[] = [];
  rowData: any[] | null = null;

  constructor(private dataService: DataserviceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.rowData = this.dataService.getDataByRoute(this.activeLink);
    this.setSection();
  }

  data(event?: any) {
    const dialogRef = this.dialog.open(DataModalComponent, {
      data:
      {
        title: event != null ? 'Edit' : 'Add',
        fields: this.section.formConfig,
        model : event != null ? event.data : null
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('closed data',result)
      //service che aggiunge a db e fa get
    });
  }

  delete(event: any) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { title: 'Delete?' }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result == true && event.data != null && event.data["id"] != null) {
        const indexToRemove = this.rowData!.findIndex(item => item.id == event.data["id"]);
        if (indexToRemove > -1) {
          const newArray = this.rowData!.slice(0, indexToRemove).concat(this.rowData!.slice(indexToRemove + 1));
          this.rowData = newArray;
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.section != null &&
      this.section?.subSections != null &&
      this.section?.subSections?.length > 0
    ) {
      this.activeLink = this.section?.subSections[0].route;
    } else {
      if (changes['section'] != null) {
        this.activeLink = changes['section'].currentValue['route'];
        this.rowData = this.dataService.getDataByRoute(this.activeLink);
      }
    }

    this.setSection();
  }

  setActiveLink(route: string): void {
    this.activeLink = route;
    this.rowData = this.dataService.getDataByRoute(this.activeLink);
    this.setSection();
  }

  onGridReady(_params: GridReadyEvent) {
    this.rowData = this.dataService.getDataByRoute(this.activeLink);
  }

  setSection(): void {
    if (
      this.section != null &&
      this.section?.subSections != null &&
      this.section?.subSections?.length > 0
    ) {
      this.colDefs =
        this.section.subSections
          .find((_) => _.route == this.activeLink)
          ?.tableHeaderFields!.map((_) => ({
            field: _.field!,
            cellRenderer: _.cellRenderer,
          })) ?? [];
    } else {
      this.colDefs =
        this.section?.tableHeaderFields?.map((_) => ({
          field: _.field!,
          cellRenderer: _.cellRenderer,
        })) ?? [];
    }

    this.rowData = this.dataService.getDataByRoute(this.activeLink);
    this.actionHeaders.forEach((element: ColDef) => {
      this.colDefs.push(element);
    });
  }
}
