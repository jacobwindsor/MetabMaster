import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwayUpdateComponent } from './pathway-update.component';

describe('PathwayUpdateComponent', () => {
  let component: PathwayUpdateComponent;
  let fixture: ComponentFixture<PathwayUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwayUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
