import { TestBed } from '@angular/core/testing';

import { SepetservisService } from './sepetservis.service';

describe('SepetservisService', () => {
  let service: SepetservisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SepetservisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
