import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTransactionsComponent } from './contact-transactions.component';

describe('ContactTransactionsComponent', () => {
  let component: ContactTransactionsComponent;
  let fixture: ComponentFixture<ContactTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
