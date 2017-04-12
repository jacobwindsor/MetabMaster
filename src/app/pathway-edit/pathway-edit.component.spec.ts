import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwayEditComponent } from './pathway-edit.component';

describe('PathwayEditComponent', () => {
  let component: PathwayEditComponent;
  let fixture: ComponentFixture<PathwayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
