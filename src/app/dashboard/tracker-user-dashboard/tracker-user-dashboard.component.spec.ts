import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerUserDashboardComponent } from './tracker-user-dashboard.component';

describe('TrackerUserDashboardComponent', () => {
  let component: TrackerUserDashboardComponent;
  let fixture: ComponentFixture<TrackerUserDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerUserDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
