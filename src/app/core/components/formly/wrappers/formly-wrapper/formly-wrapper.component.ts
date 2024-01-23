// panel-wrapper.component.ts
import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-panel',
  standalone : true,
  imports : [CommonModule, NgClass],
  template: `
    <div [ngClass]="{'{{props.class}}': props['class'] != null}">
        <ng-container #fieldComponent></ng-container>
    </div>
  `,
})
export class FormlyWrapperPanel extends FieldWrapper implements OnInit {

  ngOnInit(): void {
    console.log('props',this.props)
  }
}