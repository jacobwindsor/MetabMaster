import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwayDeleteDialogComponent } from './pathway-delete-dialog.component';

describe('PathwayDeleteDialogComponent', () => {
  let component: PathwayDeleteDialogComponent;
  let fixture: ComponentFixture<PathwayDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwayDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
