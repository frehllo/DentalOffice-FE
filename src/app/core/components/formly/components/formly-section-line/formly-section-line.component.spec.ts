import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlySectionLineComponent } from './formly-section-line.component';

describe('FormlySectionLineComponent', () => {
  let component: FormlySectionLineComponent;
  let fixture: ComponentFixture<FormlySectionLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlySectionLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormlySectionLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
