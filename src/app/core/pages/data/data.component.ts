import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Section } from '../../interfaces/section';
import { SectionComponent } from '../../components/standalones/section/section.component';
import { LoadingComponent } from '../../components/standalones/loading/loading.component';
import { AGColoredCircle } from '../../components/ag/ag-colored-circle/ag-colored-circle.component';
import { SectionService } from '../../services/section/section.service';

@Component({
  selector: 'app-data',
  standalone: true,
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss',
  imports: [
    MatSidenavModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SectionComponent,
    LoadingComponent,
  ],
})
export class DataComponent implements OnInit {
  sections: Section[] | null = null;
  activeRoute: string | null = null;

  constructor(private sectionService: SectionService) { }

  ngOnInit(): void {
    this.sectionService.getList().subscribe({
      next: res => {
        this.sections = res as Section[];
        if (this.sections != null && this.sections?.length > 0) {
          this.routeToSection(this.sections[0].route);
        }
      },
      error: e => {
        console.log('error getting sections', e);
      }
    });
  }

  routeToSection(route: string): void {
    console.log('parent',route);
    this.activeRoute = route;
  }
}
