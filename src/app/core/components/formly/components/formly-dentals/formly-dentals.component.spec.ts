import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyDentalsComponent } from './formly-dentals.component';

describe('FormlyDentalsComponent', () => {
  let component: FormlyDentalsComponent;
  let fixture: ComponentFixture<FormlyDentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyDentalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormlyDentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
