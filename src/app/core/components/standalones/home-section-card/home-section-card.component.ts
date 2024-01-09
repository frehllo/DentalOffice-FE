import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-section-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './home-section-card.component.html',
  styleUrl: './home-section-card.component.scss'
})
export class HomeSectionCardComponent {
  @Input() iconName: string = "";
  @Input() iconSize: string = "";
  @Input() colorClass: string = "";
  @Input('title') sectionTitle: string = "Section";
}
