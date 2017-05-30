import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundDetailComponent } from './compound-detail.component';

describe('CompoundDetailComponent', () => {
  let component: CompoundDetailComponent;
  let fixture: ComponentFixture<CompoundDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
