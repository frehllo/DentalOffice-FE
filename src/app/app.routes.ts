import { Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { DataComponent } from './core/pages/data/data.component';
import { SectionComponent } from './core/components/standalones/section/section.component';

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
  }
];
