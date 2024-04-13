import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyMultiSelectComponent } from './formly-multi-select.component';

describe('FormlyMultiSelectComponent', () => {
  let component: FormlyMultiSelectComponent;
  let fixture: ComponentFixture<FormlyMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyMultiSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormlyMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
