import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/standalones/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  showHeader: boolean = true;

  constructor(private router:Router) {
    router.events.subscribe(
      (val) =>{
        if(val instanceof NavigationEnd) {
          if(val.url=="/") {
            this.showHeader = true;
          }
          //aggiungere il resto delle route per definire se mostrare o meno l'header
        }
      }
    )
  }

  title = 'DentalOffice';
}
