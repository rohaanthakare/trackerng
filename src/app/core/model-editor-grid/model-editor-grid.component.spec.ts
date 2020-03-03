import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEditorGridComponent } from './model-editor-grid.component';

describe('ModelEditorGridComponent', () => {
  let component: ModelEditorGridComponent;
  let fixture: ComponentFixture<ModelEditorGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelEditorGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelEditorGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
