import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpActivationComponent } from './otp-activation.component';

describe('OtpActivationComponent', () => {
  let component: OtpActivationComponent;
  let fixture: ComponentFixture<OtpActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
