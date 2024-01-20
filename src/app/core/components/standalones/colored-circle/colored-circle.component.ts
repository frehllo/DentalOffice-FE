import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-colored-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './colored-circle.component.html',
  styleUrl: './colored-circle.component.scss',
})
export class ColoredCircleComponent implements OnInit {
  @Input() value: string = '';
  @Input() shadow: boolean = false;
  @Input() height: number = 10;
  width: number = 0;

  ngOnInit(): void {
    this.width = this.height;
  }
}
