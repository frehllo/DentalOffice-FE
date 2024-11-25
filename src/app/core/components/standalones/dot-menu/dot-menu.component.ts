import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-dot-menu',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './dot-menu.component.html',
  styleUrl: './dot-menu.component.scss'
})
export class DotMenuComponent {
  @Output('save') save: EventEmitter<any> = new EventEmitter();
  @Output('reset') reset: EventEmitter<any> = new EventEmitter();
  @Output('print') print: EventEmitter<any> = new EventEmitter();
  @Output('delete') delete: EventEmitter<any> = new EventEmitter();
  
  @Input() saveDisabled: boolean = false;
  @Input() printDisabled: boolean = false;
  @Input() resetDisabled: boolean = false;

  showScrollToTop: boolean = false;
  showScrollHeight = 50;
  hideScrollHeight = 50;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      (
        window.pageYOffset 
      ) > this.showScrollHeight
    ) {
      this.showScrollToTop = true;
    } else if (this.showScrollToTop &&
      (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showScrollToTop = false;
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  saveMethod() {
    this.save.emit();
  }

  resetMethod() {
    this.reset.emit();
  }

  printMethod() {
    this.print.emit();
  }

  deleteMethod() {
    this.delete.emit();
  }
}
