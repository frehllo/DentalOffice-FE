import { Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { DataComponent } from './core/pages/data/data.component';
import { ModulesListComponent } from './core/pages/modules/module-list/modules-list.component';
import { WriteModuleComponent } from './core/pages/modules/write-module/write-module.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'data',
    component: DataComponent,
  },
  {
    path: 'modules',
    component: ModulesListComponent,
  },
  {
    path: 'write-module',
    component: WriteModuleComponent,
  }
];
