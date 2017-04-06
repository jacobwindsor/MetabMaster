import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpOrSignInComponent } from './sign-up-or-sign-in.component';

describe('SignUpOrSignInComponent', () => {
  let component: SignUpOrSignInComponent;
  let fixture: ComponentFixture<SignUpOrSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpOrSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpOrSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
