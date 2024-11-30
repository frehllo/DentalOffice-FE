import { AGType } from './../../ag/AGType';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
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
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { LoadingComponent } from "../loading/loading.component";
import { DesignModuleModalComponent } from '../modals/design-module-modal/design-module-modal.component';

@Component({
  selector: 'app-section',
  standalone: true,
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
  imports: [
    AgGridModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    AGActionIconComponent,
    LoadingComponent
  ]
})
export class SectionComponent implements OnChanges {
  /* @Input() section: Section  = { title: 'NOT FOUND', route: '/not-found' }; */
  @Input() active: string | null = null;
  isLoading: boolean = false;

  section: Section | null = null;
  parentSection: Section | null = null;

  actionHeaders: ColDef[] = [
    {
      field: 'Edit',
      cellRenderer: AGActionIconComponent,
      cellRendererParams: {
        iconName: 'edit',
      },
      onCellClicked: (event) => this.data(event),
      resizable: false,
    },
    {
      field: 'Delete',
      cellRenderer: AGActionIconComponent,
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
    if (changes['active'] != null && this.active) {
      this.isLoading = true;
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

          this.isLoading = false;;
        },
        error: e => {
          console.log('error getting sections', e);
          this.isLoading = false;
        }
      })
    }
  }

  getAllData(): void {
    if (this.active != null && this.section != null) {
      this.isLoading = true;
      this.sectionService.getByRoute(this.active).subscribe({
        next: (res: any) => {
          this.section = res;
          if (this.section) {
            this.sectionService.getAllData(this.section.apiString!).subscribe({
              next: (data: any) => {
                this.rowData = data;
                this.configureSection(this.section);
              },
              error: e => {
                console.log('error getting data list', e);
                this.isLoading = false;
              }
            });
          }
        },
        error: e => {
          console.log('error getting section data', e);
          this.isLoading = false;
        }
      });
      this.isLoading = false;
    }
  }

  configureSection(section: Section | null): void {
    if (section != null) {
      this.colDefs =
        section.configuration?.tableHeaderFields?.map((_) => ({
          field: _.field,
          cellRenderer: _.cellRenderer == AGType[0] ? AGColoredCircle : null,
        })) ?? [];
    }


    this.actionHeaders.forEach(element => {
      this.colDefs.push(element)
    });
  }

  setActive(route: string) {
    this.active = route;
    this.getAllData();
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
        if (result && result.success) {
          if (!event) {
            this.isLoading = true;
            this.sectionService.insertData(this.section?.apiString!, result.model).subscribe({
              next: () => {
                this.getAllData();
                this.isLoading = false;
              },
              error: e => {
                this.getAllData();
                this.isLoading = false;
                console.log('error during insert', e)
              }
            });
          } else {
            this.sectionService.updateData(this.section?.apiString!, result.model).subscribe({
              next: () => {
                this.getAllData();
                this.isLoading = false;
              },
              error: e => {
                this.getAllData();
                this.isLoading = false;
                console.log('error during update', e)
              }
            });
          }
        }
      });
    }
  }

  delete(event: any) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Delete?'
      }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.isLoading = true;
        this.sectionService.deleteData(this.section?.apiString!, event.data.id).subscribe({
          next: () => {
            this.getAllData();
          },
          error: e => {
            this.isLoading = false;
            console.log('error during update', e)
          }
        });
        this.isLoading = false;
      }
    });
  }
}
