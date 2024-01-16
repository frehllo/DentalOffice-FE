import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Section } from '../../../interfaces/section';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AGColoredCircle } from '../colored-circle/ag-colored-circle/ag-colored-circle.component';
import { DataserviceService } from '../../../services/dataservice/dataservice.service';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [AgGridModule, CommonModule, MatButtonModule, AGColoredCircle],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent implements OnInit, OnChanges {
  @Input() section: Section = { title: 'NOT FOUND', route: '/not-found' };

  activeLink: string = '';
  colDefs: ColDef[] = [];
  rowData: any | undefined = null;

  constructor(private dataService: DataserviceService) { }

  ngOnInit(): void {
    this.rowData = this.dataService.getDataByRoute(this.activeLink);
    this.setSection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.section != null &&
      this.section?.subSections != null &&
      this.section?.subSections?.length > 0
    ) {
      this.activeLink = this.section?.subSections[0].route;
    } else {
      if (changes["section"] != null) {
        this.activeLink = changes["section"].currentValue["route"];
        this.rowData = this.dataService.getDataByRoute(this.activeLink);
      }
    }
    /* this.activeLink = changes. */

    this.setSection();
  }

  setActiveLink(route: string): void {
    this.activeLink = route;
    this.rowData = this.dataService.getDataByRoute(this.activeLink);
    this.setSection();
  }

  onGridReady(params: GridReadyEvent) {
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
            cellRenderer: _.cellRenderer
          })) ?? [];
    } else {
      this.colDefs =
        this.section?.tableHeaderFields?.map((_) => ({
          field: _.field!,
          cellRenderer: _.cellRenderer
        })) ?? [];
    }

    this.rowData = this.dataService.getDataByRoute(this.activeLink);
  }
}
