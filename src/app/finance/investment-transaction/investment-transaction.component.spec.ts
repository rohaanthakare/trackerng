import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentTransactionComponent } from './investment-transaction.component';

describe('InvestmentTransactionComponent', () => {
  let component: InvestmentTransactionComponent;
  let fixture: ComponentFixture<InvestmentTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
