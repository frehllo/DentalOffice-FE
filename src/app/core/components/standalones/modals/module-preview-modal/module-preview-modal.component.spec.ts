import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulePreviewModalComponent } from './module-preview-modal.component';

describe('ModulePreviewModalComponent', () => {
  let component: ModulePreviewModalComponent;
  let fixture: ComponentFixture<ModulePreviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulePreviewModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModulePreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
