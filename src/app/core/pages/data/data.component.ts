import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DentalStudiosComponent } from './sections/dental-studios/dental-studios.component';
import { Section } from '../../interfaces/section';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    DentalStudiosComponent,
  ],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss',
})
export class DataComponent {
  
  dataSections: Section[] = [
    {
      iconName: 'store',
      title: 'Studi Dentistici',
      route: '/dental-studios'
    },
    {
      iconName: 'wb_iridescent',
      title: 'Materiali',
      route: '/materials',
    },
    {
      iconName: 'color_lens',
      title: 'Colori',
      route: '/colors',
    },
    {
      iconName: 'work_outline',
      title: 'Semilavorazioni',
      route: '/semiproducts',
    },
    {
      iconName: 'error_outline',
      title: 'Rischi',
      route: '/risks',
    },
    {
      iconName: 'insert_drive_file',
      title: 'Moduli',
      route: '/colori',
    },
    {
      iconName: 'skip_next',
      title: 'Fasi di lavorazione',
      route: '/stages',
    },
    {
      iconName: 'format_list_numbered',
      title: 'Lotti',
      route: '/lots',
    },
  ];
  activeLink = this.dataSections[0].route;

  routeToSection(route: string): void {
    this.activeLink = route;
    console.log(this.activeLink);
  }
}
