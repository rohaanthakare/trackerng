import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSelectionListComponent } from './model-selection-list.component';

describe('ModelSelectionListComponent', () => {
  let component: ModelSelectionListComponent;
  let fixture: ComponentFixture<ModelSelectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelSelectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
