import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwayListComponent } from './pathway-list.component';

describe('PathwayListComponent', () => {
  let component: PathwayListComponent;
  let fixture: ComponentFixture<PathwayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
