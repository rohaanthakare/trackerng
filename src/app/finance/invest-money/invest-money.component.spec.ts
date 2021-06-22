import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestMoneyComponent } from './invest-money.component';

describe('InvestMoneyComponent', () => {
  let component: InvestMoneyComponent;
  let fixture: ComponentFixture<InvestMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
