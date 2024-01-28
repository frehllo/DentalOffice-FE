import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyAgGridComponent } from './formly-ag-grid.component';

describe('FormlyAgGridComponent', () => {
  let component: FormlyAgGridComponent;
  let fixture: ComponentFixture<FormlyAgGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyAgGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormlyAgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
