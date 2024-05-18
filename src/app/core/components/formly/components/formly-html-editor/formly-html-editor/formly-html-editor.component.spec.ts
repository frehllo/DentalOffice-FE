import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyHtmlEditorComponent } from './formly-html-editor.component';

describe('FormlyHtmlEditorComponent', () => {
  let component: FormlyHtmlEditorComponent;
  let fixture: ComponentFixture<FormlyHtmlEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyHtmlEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormlyHtmlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
