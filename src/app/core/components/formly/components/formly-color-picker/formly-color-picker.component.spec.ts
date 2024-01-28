import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyColorPickerComponent } from './formly-color-picker.component';

describe('FormlyColorPickerComponent', () => {
  let component: FormlyColorPickerComponent;
  let fixture: ComponentFixture<FormlyColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyColorPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormlyColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
