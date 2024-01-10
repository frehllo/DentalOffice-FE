import { Component } from '@angular/core';
import { HomeSectionCardComponent } from '../../components/standalones/home-section-card/home-section-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeSectionCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
