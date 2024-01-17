import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgActionIconComponent } from './ag-action-icon.component';

describe('AgActionIconComponent', () => {
  let component: AgActionIconComponent;
  let fixture: ComponentFixture<AgActionIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgActionIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgActionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
