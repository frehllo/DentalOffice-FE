import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

class Section {
  title: string;
  route: string;
  iconName: string;

  // Constructor
  constructor(route: string, title: string, iconName: string) {
    this.route = route;
    this.title = title;
    this.iconName = iconName;
  }
}


@Component({
  selector: 'app-data',
  standalone: true,
  imports: [MatSidenavModule,CommonModule,MatButtonModule,MatIconModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {

  sections: Section[] = [
    {
      iconName : "store",
      title: "Studi Dentistici",
      route: "/studi-dentistici"
    },
    {
      iconName : "store",
      title: "Materiali",
      route: "/materiali"
    },
    {
      iconName : "store",
      title: "Colori",
      route: "/materiali"
    }
  ]
  activeLink = this.sections[0].route;

  routeToSection(route: string) : void {
    this.activeLink = route;
    console.log(this.activeLink)
  }
}
