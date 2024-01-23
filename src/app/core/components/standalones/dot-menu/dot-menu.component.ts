import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dot-menu',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './dot-menu.component.html',
  styleUrl: './dot-menu.component.scss'
})
export class DotMenuComponent {
  @Output('save') save: EventEmitter<any> = new EventEmitter();
  @Output('reset') reset: EventEmitter<any> = new EventEmitter();
  @Input() saveDisabled : boolean = false;
  @Input() resetDisabled : boolean = false;

  saveMethod(){
    this.save.emit();
  }

  resetMethod(){
    this.reset.emit();
  }
}
