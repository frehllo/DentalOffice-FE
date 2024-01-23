import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyWrapperComponent } from './formly-wrapper.component';

describe('FormlyWrapperComponent', () => {
  let component: FormlyWrapperComponent;
  let fixture: ComponentFixture<FormlyWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormlyWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
