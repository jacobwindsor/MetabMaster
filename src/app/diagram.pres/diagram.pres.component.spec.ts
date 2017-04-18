import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramPresComponent } from './diagram.pres.component';

describe('DiagramPresComponent', () => {
  let component: DiagramPresComponent;
  let fixture: ComponentFixture<DiagramPresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagramPresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramPresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
