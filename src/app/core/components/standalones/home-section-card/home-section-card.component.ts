import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home-section-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './home-section-card.component.html',
  styleUrl: './home-section-card.component.scss'
})
export class HomeSectionCardComponent {
  @Input() imageName: string = "";
  @Input('title') sectionTitle: string = "Section";

  public imageUrl = "../../../assets/images/bg.jpg" + this.imageName
}
