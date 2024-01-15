import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Section } from '../../../interfaces/section';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [
    AgGridModule,
    CommonModule,
    MatButtonModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent implements OnInit {
  @Input() section: Section = { title: "NOT FOUND", route: "/not-found" };

  activeLink: string = "";
  colDefs: ColDef[] = [];
  rowData: any | undefined = null;

  ngOnInit(): void {
    this.setSection();
  }

  setActiveLink(title: string): void {
    this.activeLink = title;
    this.setSection();
  }

  setSection(): void {
    if (this.section != null && this.section?.subSections != null && this.section?.subSections?.length > 0) {
      this.colDefs = this.section.subSections.find(_ => _.title == this.activeLink)?.tableHeaderFields!.map((_) => ({
        field: _.field.toLowerCase()
      })) ?? [];
    } else {
      this.colDefs = this.section?.tableHeaderFields?.map((_) => ({
        field: _.field.toLowerCase(),
      })) ?? [];
    }
    //dovrebbe essere preso dal service
    this.rowData = [
      {
        name: "Studio Dentistico di Roma",
        color: "#A2A2A2"
      },
      {
        name: "Studio Dentistico a Caso",
        color: "#FFFFFF"
      },
    ]
  }

}

