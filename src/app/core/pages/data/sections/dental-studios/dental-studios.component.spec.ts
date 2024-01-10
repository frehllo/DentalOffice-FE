import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentalStudiosComponent } from './dental-studios.component';

describe('DentalStudiosComponent', () => {
  let component: DentalStudiosComponent;
  let fixture: ComponentFixture<DentalStudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DentalStudiosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DentalStudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
