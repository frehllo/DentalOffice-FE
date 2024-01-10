import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-section-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './home-section-card.component.html',
  styleUrl: './home-section-card.component.scss',
})
export class HomeSectionCardComponent {
  @Input() iconName: string = '';
  @Input() iconSize: number = 12;
  @Input() colorClass: string = '';
  @Input() title: string = 'Section';
  @Input() titleSize: number = 12;
}
