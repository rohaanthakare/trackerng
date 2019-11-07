import { TestBed } from '@angular/core/testing';

import { MasterViewService } from './master-view.service';

describe('MasterViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterViewService = TestBed.get(MasterViewService);
    expect(service).toBeTruthy();
  });
});
