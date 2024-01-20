import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ColoredCircleComponent } from "../colored-circle/colored-circle.component";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-module-card',
    standalone: true,
    templateUrl: './module-card.component.html',
    styleUrl: './module-card.component.scss',
    imports: [CommonModule, MatButtonModule, ColoredCircleComponent],
    animations: [
      trigger('slideInOut', [
        transition(':enter', [
          style({transform: 'translateY(-10%)', opacity : 0}),
          animate('200ms ease-in', style({transform: 'translateY(0%)', opacity: 1}))
        ]),
        transition(':leave', [
          animate('200ms ease-out', style({transform: 'translateY(-10%)', opacity : 0}))
        ])
      ])
    ]
})
export class ModuleCardComponent implements OnInit{
  @Input() moduleInfo : any = null;

  constructor(private router: Router) {}

  info : any | null = null;
  updateDateVisible : boolean = false;

  ngOnInit(): void {
    this.info = this.moduleInfo;
  }

  showUpdateDate(show : boolean) {
    this.updateDateVisible = show;
  }

  enterModule(id : any) {
    this.router.navigate(['/write-module'], {state : {id : id}});
  }
}
