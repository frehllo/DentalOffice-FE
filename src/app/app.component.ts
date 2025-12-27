import { Component, ErrorHandler, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/standalones/header/header.component';
import { DataserviceService } from './core/services/dataservice/dataservice.service';
import { HttpClientModule } from '@angular/common/http';
import { DotMenuComponent } from './core/components/standalones/dot-menu/dot-menu.component';
import * as moment from 'moment';
import { GlobalErroHandler } from './core/services/globalerrorhandler/global-error-handler.service';
import { UtilityService } from './core/services/utilityservice/utility.service';
import { LoadingComponent } from "./core/components/standalones/loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HttpClientModule, DotMenuComponent, LoadingComponent],
  providers: [DataserviceService, { provide: moment, useValue: moment }, { provide: ErrorHandler, useClass: GlobalErroHandler }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  showHeader: boolean = true;
  showHeaderBack: boolean = true;
  serverReady = false;
  loading = true;

  ngOnInit() {
    this.checkServerStatus();
  }

  constructor(private router: Router, public utilityService: UtilityService,) {
    router.events.subscribe(
      (val) => {
        if (val instanceof NavigationEnd) {
          if (val.url == "/") {
            this.showHeader = true;
          }
          if (val.url == "/home" || val.url == "/") {
            this.showHeaderBack = false;
          } else {
            this.showHeaderBack = true;
          }
          //aggiungere il resto delle route per definire se mostrare o meno l'header
        }
      }
    )
  }

  title = 'DentalOffice';

  checkServerStatus() {
    if(sessionStorage.getItem('serverStatusWorking') == null || sessionStorage.getItem('serverStatusWorking') == "0") {
      const interval = setInterval(() => {
        this.utilityService.checkServerStatus().subscribe(status => {
          if (status) {
            this.serverReady = true;
            sessionStorage.setItem('serverStatusWorking', "1");
            this.loading = false;
            clearInterval(interval);
          }else {
            sessionStorage.setItem('serverStatusWorking', "0");
          }
        });
      }, 5000);
    }else {
      this.loading = false;
    }
  }
}
