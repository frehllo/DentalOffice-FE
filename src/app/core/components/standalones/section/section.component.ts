import { AGType } from './../../ag/AGType';
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
import { AGActionIconComponent } from '../../ag/ag-action-icon/ag-action-icon.component';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component'; 
import {
  MatDialog
} from '@angular/material/dialog';
import { DataModalComponent } from '../modals/data-modal/data-modal.component';
import { SectionService } from '../../../services/section/section.service';
import { AGColoredCircle } from '../../ag/ag-colored-circle/ag-colored-circle.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [
    AgGridModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    AGActionIconComponent
  ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent implements OnInit, OnChanges {
  @Input() section: Section = { title: 'NOT FOUND', route: '/not-found' };

  actionHeaders: ColDef[] = [
    {
      field: 'Edit',
      cellRenderer: /* eval(" */AGActionIconComponent/* ") */, //CAUTION - Da tenere a mente questo codice!!!!!!!!
      cellRendererParams: {
        iconName: 'edit',
      },
      onCellClicked: (event) => this.data(event),
      resizable : false,
    },
    {
      field: 'Delete',
      cellRenderer: /* eval(" */AGActionIconComponent/* ") */, //CAUTION - Da tenere a mente questo codice!!!!!!!!
      cellRendererParams: {
        iconName: 'delete',
      },
      onCellClicked: (event) => this.delete(event),
      resizable : false
    },
  ];
  activeRoute: string = '';
  colDefs: ColDef[] = [];
  rowData: any[] | null = null;

  constructor(private dataService: DataserviceService, public dialog: MatDialog, private sectionService : SectionService) { }

  ngOnInit(): void {
    this.rowData = this.dataService.getDataByRoute(this.activeRoute);
    this.setSection();
  }

  data(event?: any) {
    console.log('CONFIGURATION',this.section.configuration?.formConfiguration)
    const dialogRef = this.dialog.open(DataModalComponent, {
      data:
      {
        title: event != null ? 'Edit' : 'Add',
        fields: this.section.configuration?.formConfiguration,
        model : event != null ? event.data : null
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
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
      this.activeRoute = this.section?.subSections[0].route;
    } else {
      if (changes['section'] != null && this.section != null) {
        this.activeRoute = changes['section'].currentValue['route'];
        this.rowData = this.dataService.getDataByRoute(this.activeRoute);
      }
    }

    this.setSection();
  }

  setActiveRoute(route: string): void {
    this.activeRoute = route;
    this.rowData = this.dataService.getDataByRoute(this.activeRoute);
    this.setSection();
  }

  onGridReady(_params: GridReadyEvent) {
    this.rowData = this.dataService.getDataByRoute(this.activeRoute);
  }

  setSection(): void {
    if (
      this.section != null &&
      this.section?.subSections != null &&
      this.section?.subSections?.length > 0
    ) {
      this.colDefs =
        this.section.subSections
          .find((_) => _.route == this.activeRoute)
          ?.configuration?.tableHeaderFields?.map((_) => ({
            field: _.field!,
            cellRenderer: _.cellRenderer == AGType[0] ? AGColoredCircle :  null,
          })) ?? [];
    } else {
      this.colDefs =
        this.section?.configuration?.tableHeaderFields?.map((_) => ({
          field: _.field!,
          cellRenderer: _.cellRenderer == AGType[0] ? AGColoredCircle :  null,
        })) ?? [];
    }

    this.actionHeaders.forEach((element: ColDef) => {
      this.colDefs.push(element);
    });
  }
}
