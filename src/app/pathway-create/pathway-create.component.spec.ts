import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwayCreateComponent } from './pathway-create.component';

describe('PathwayCreateComponent', () => {
  let component: PathwayCreateComponent;
  let fixture: ComponentFixture<PathwayCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwayCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
