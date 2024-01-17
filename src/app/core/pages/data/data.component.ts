import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Section } from '../../interfaces/section';
import { SectionComponent } from '../../components/standalones/section/section.component';
import { LoadingComponent } from '../../components/standalones/loading/loading.component';
import { AGColoredCircle } from '../../components/ag/ag-colored-circle/ag-colored-circle.component';

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
export class DataComponent {
  dataSections: Section[] = [
    {
      iconName: 'store',
      title: 'Studi Dentistici',
      route: '/dental-studios',
      tableHeaderFields: [
        { field: 'Name' },
        {
          field: 'Color',
          cellRenderer: AGColoredCircle
        },
      ],
      formConfig: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Email address',
            required: true,
          },
          className : 'col-lg-4 col-sm-12'
        },
        {
          key: 'color',
          type: 'input',
          props: {
            label: 'Color',
            required: true,
          },
          className : 'col-lg-4 col-sm-12'
        }
      ]
    },
    {
      iconName: 'wb_iridescent',
      title: 'Materiali',
      route: '/materials',
      subSections: [
        {
          route: '/materials-metal',
          title: 'Metalli',
          tableHeaderFields: [
            {
              field: 'Name',
            },
          ],
        },
        {
          route: '/materials-dentin',
          title: 'Dentina',
          tableHeaderFields: [
            {
              field: 'Name',
            },
          ],
        },
        {
          route: '/materials-enamel',
          title: 'Smalto',
          tableHeaderFields: [
            {
              field: 'Code',
            },
            {
              field: 'Colors',
            },
            {
              field: 'Dentin',
            },
          ],
        },
        {
          route: '/materials-resin',
          title: 'Resina Acetalica',
          tableHeaderFields: [
            {
              field: 'Name',
            },
          ],
        },
        {
          route: '/materials-disks',
          title: 'Dischi Policarbonati',
          tableHeaderFields: [
            {
              field: 'Name',
            },
          ],
        },
      ],
    },
    {
      iconName: 'color_lens',
      title: 'Colori',
      route: '/colors',
      tableHeaderFields: [
        {
          field: 'Name',
        },
      ],
    },
    {
      iconName: 'work_outline',
      title: 'Semilavorazioni',
      route: '/semiproducts',
      tableHeaderFields: [
        {
          field: 'Name',
        },
      ],
    },
    {
      iconName: 'error_outline',
      title: 'Rischi',
      route: '/risks',
      tableHeaderFields: [
        {
          field: 'Name',
        },
      ],
    },
    {
      iconName: 'insert_drive_file',
      title: 'Moduli',
      route: '/modules',
      tableHeaderFields: [
        {
          field: 'Name',
        },
      ],
    },
    {
      iconName: 'skip_next',
      title: 'Fasi di lavorazione',
      route: '/stages',
      tableHeaderFields: [
        {
          field: 'Name',
        },
      ],
    },
    {
      iconName: 'format_list_numbered',
      title: 'Lotti',
      route: '/lots',
      subSections: [
        {
          route: '/lots-metal',
          title: 'Metalli',
          tableHeaderFields: [
            {
              field: 'Name',
            },
            {
              field: 'Number',
            },
          ],
        },
        {
          route: '/lots-dentin',
          title: 'Dentina',
          tableHeaderFields: [
            {
              field: 'Name',
            },
            {
              field: 'Color',
            },
            {
              field: 'Number',
            },
          ],
        },
        {
          route: '/lots-enamel',
          title: 'Smalto',
          tableHeaderFields: [
            {
              field: 'Code',
            },
            {
              field: 'Number',
            },
          ],
        },
        {
          route: '/lots-resin',
          title: 'Resina Acetalica',
          tableHeaderFields: [
            {
              field: 'Name',
            },
            {
              field: 'Number',
            },
          ],
        },
        {
          route: '/lots-disks',
          title: 'Dischi Policarbonati',
          tableHeaderFields: [
            {
              field: 'Name',
            },
            {
              field: 'Number',
            },
          ],
        },
      ],
    },
  ];

  activeLink = this.dataSections[0].route;
  activeSection: Section = this.dataSections[0];

  routeToSection(route: string): void {
    this.activeLink = route;
    this.activeSection = this.dataSections.find((_) => _.route == route)!;
  }
}
