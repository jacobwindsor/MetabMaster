import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveDescriptionPresComponent } from './interactive-description.pres.component';

describe('InteractiveDescriptionPresComponent', () => {
  let component: InteractiveDescriptionPresComponent;
  let fixture: ComponentFixture<InteractiveDescriptionPresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveDescriptionPresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveDescriptionPresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
