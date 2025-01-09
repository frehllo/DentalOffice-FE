import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AGCustomTooltipComponent } from './ag-custom-tooltip.component';

describe('AGCustomTooltipComponent', () => {
  let component: AGCustomTooltipComponent;
  let fixture: ComponentFixture<AGCustomTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AGCustomTooltipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AGCustomTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
