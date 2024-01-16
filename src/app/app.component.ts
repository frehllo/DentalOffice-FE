import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/standalones/header/header.component';
import { DataserviceService } from './core/services/dataservice/dataservice.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HttpClientModule],
  providers: [DataserviceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  showHeader: boolean = true;
  showHeaderBack: boolean = true;

  constructor(private router:Router) {
    router.events.subscribe(
      (val) =>{
        if(val instanceof NavigationEnd) {
          if(val.url=="/") {
            this.showHeader = true;
          }
          if(val.url=="/home"){
            this.showHeaderBack = false;
          }else{
            this.showHeaderBack = false;
          }
          //aggiungere il resto delle route per definire se mostrare o meno l'header
        }
      }
    )
  }

  title = 'DentalOffice';
}
