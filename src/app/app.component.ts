import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/standalones/header/header.component';
import { DataserviceService } from './core/services/dataservice/dataservice.service';
import { HttpClientModule } from '@angular/common/http';
import { DotMenuComponent } from './core/components/standalones/dot-menu/dot-menu.component';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HttpClientModule, DotMenuComponent],
  providers: [DataserviceService, {provide : moment, useValue : moment}],
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
          console.log(val.url)
          if(val.url=="/") {
            this.showHeader = true;
          }
          if(val.url=="/home" || val.url=="/"){
            console.log(val.url)
            this.showHeaderBack = false;
          }else{
            this.showHeaderBack = true;
          }
          //aggiungere il resto delle route per definire se mostrare o meno l'header
        }
      }
    )
  }

  title = 'DentalOffice';
}
