import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundsComponent } from './compounds.component';

describe('CompoundsComponent', () => {
  let component: CompoundsComponent;
  let fixture: ComponentFixture<CompoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
