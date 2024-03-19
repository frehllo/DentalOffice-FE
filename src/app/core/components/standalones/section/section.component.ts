import { AGType } from './../../ag/AGType';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Section } from '../../../interfaces/section';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AGActionIconComponent } from '../../ag/ag-action-icon/ag-action-icon.component';
import {
  MatDialog
} from '@angular/material/dialog';
import { DataModalComponent } from '../modals/data-modal/data-modal.component';
import { SectionService } from '../../../services/section/section.service';
import { AGColoredCircle } from '../../ag/ag-colored-circle/ag-colored-circle.component';
import { ModalResult } from '../modals/modal-result';

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
export class SectionComponent implements OnChanges {
  /* @Input() section: Section  = { title: 'NOT FOUND', route: '/not-found' }; */
  @Input() active: string | null = null;

  section: Section | null = null;
  parentSection: Section | null = null;

  actionHeaders: ColDef[] = [
    {
      field: 'Edit',
      cellRenderer: /* eval(" */AGActionIconComponent/* ") */, //CAUTION - Da tenere a mente questo codice!!!!!!!!
      cellRendererParams: {
        iconName: 'edit',
      },
      onCellClicked: (event) => this.data(event),
      resizable: false,
    },
    {
      field: 'Delete',
      cellRenderer: /* eval(" */AGActionIconComponent/* ") */, //CAUTION - Da tenere a mente questo codice!!!!!!!!
      cellRendererParams: {
        iconName: 'delete',
      },
      onCellClicked: (event) => this.delete(event),
      resizable: false
    },
  ];

  colDefs: ColDef[] = [];
  rowData: any[] | null = null;

  constructor(public dialog: MatDialog, private sectionService: SectionService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['active'] != null, this.active) {
      this.sectionService.getByRoute(changes['active'].currentValue).subscribe({
        next: (active: any) => {
          this.section = active as Section;

          if (this.section.subSections != null && this.section.subSections.length > 0) {
            this.parentSection = this.section;
            this.active = this.section.subSections[0].route;
            this.section = this.section.subSections[0];
          } else {
            this.parentSection = null;
          }

          this.getAllData();
          this.configureSection();
        },
        error: e => {
          console.log('error getting sections', e);
        }
      });
    }
  }

  getAllData(): void {
    if (this.active != null && this.section != null) {
      this.sectionService.getAllData(this.section.apiString!).subscribe({
        next: (data: any) => {
          this.rowData = data;
        },
        error: e => {
          console.log('error getting data list', e);
        }
      });
    }
  }

  configureSection(): void {
    if (this.section != null) {
      this.colDefs =
        this.section.configuration?.tableHeaderFields?.map((_) => ({
          field: _.field,
          cellRenderer: _.cellRenderer == AGType[0] ? AGColoredCircle : null,
        })) ?? [];
    }


    this.actionHeaders.forEach(element => {
      this.colDefs.push(element)
    });
  }

  setActive(route: string): void {
    this.active = route;

    this.getAllData();
    this.configureSection();
  }

  data(event?: any) {
    if (this.section) {
      const dialogRef = this.dialog.open(DataModalComponent, {
        data:
        {
          title: event != null ? 'Edit' : 'Add',
          fields: this.section.configuration?.formConfiguration,
          model: event != null ? event.data : null
        }
      });
      dialogRef.afterClosed().subscribe((result: ModalResult) => {
        if (result.success) {
          this.sectionService.insertData(this.section!.apiString!, result.model).subscribe({
            error: e => {
              console.log('error getting data list', e);
            }
          }
          );
        }
      });
    }
  }

  delete(event: any) {
    //TODO : implement delete with service
  }

  onGridReady(_params: GridReadyEvent) {
    if (this.active) {
      this.sectionService.getAllData(this.active).subscribe({
        next: (data: any) => {
          this.rowData = data;
        },
        error: e => {
          console.log('error getting data list', e);
        }
      });
    }
  }
}
