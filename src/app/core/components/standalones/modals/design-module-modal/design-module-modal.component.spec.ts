import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignModuleModalComponent } from './design-module-modal.component';

describe('DesignModuleModalComponent', () => {
  let component: DesignModuleModalComponent;
  let fixture: ComponentFixture<DesignModuleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignModuleModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesignModuleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
