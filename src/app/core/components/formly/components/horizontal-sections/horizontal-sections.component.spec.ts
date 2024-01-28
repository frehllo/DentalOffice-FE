import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalSectionsComponent } from './horizontal-sections.component';

describe('HorizontalSectionsComponent', () => {
  let component: HorizontalSectionsComponent;
  let fixture: ComponentFixture<HorizontalSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalSectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorizontalSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
