import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSidenavButtonComponent } from './data-sidenav-button.component';

describe('DataSidenavButtonComponent', () => {
  let component: DataSidenavButtonComponent;
  let fixture: ComponentFixture<DataSidenavButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSidenavButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataSidenavButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
