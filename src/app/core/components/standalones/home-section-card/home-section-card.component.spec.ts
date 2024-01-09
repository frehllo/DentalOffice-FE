import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionCardComponent } from './home-section-card.component';

describe('HomeSectionCardComponent', () => {
  let component: HomeSectionCardComponent;
  let fixture: ComponentFixture<HomeSectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSectionCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
