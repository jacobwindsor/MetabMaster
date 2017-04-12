import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveDescriptionComponent } from './interactive-description.component';

describe('InteractiveDescriptionComponent', () => {
  let component: InteractiveDescriptionComponent;
  let fixture: ComponentFixture<InteractiveDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
