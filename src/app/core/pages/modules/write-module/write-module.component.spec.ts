import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteModuleComponent } from './write-module.component';

describe('WriteModuleComponent', () => {
  let component: WriteModuleComponent;
  let fixture: ComponentFixture<WriteModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WriteModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
