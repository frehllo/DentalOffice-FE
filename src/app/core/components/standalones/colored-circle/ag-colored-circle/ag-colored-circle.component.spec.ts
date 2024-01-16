import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgColoredCircleComponent } from './ag-colored-circle.component';

describe('AgColoredCircleComponent', () => {
  let component: AgColoredCircleComponent;
  let fixture: ComponentFixture<AgColoredCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgColoredCircleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgColoredCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
