// panel-wrapper.component.ts
import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-panel',
  standalone : true,
  imports : [CommonModule, NgClass],
  template: `
    <!-- <div class="row" [ngClass]="{'{{props.class}}': props['class'] != null}">
        <ng-container class="col-1"></ng-container>
    </div> -->
    <div class="row mb-3">
      <label [attr.for]="id" class="col-sm-2 col-form-label" *ngIf="props.label">
        {{ props.label }}
      </label>
      <div class="col-sm-7">
        <ng-template #fieldComponent></ng-template>
      </div>
    </div>
  `,
})
export class FormlyWrapperPanel extends FieldWrapper implements OnInit {

  ngOnInit(): void {
    console.log('props',this.props)
  }
}