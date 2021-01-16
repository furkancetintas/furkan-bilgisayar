import { TestBed } from '@angular/core/testing';

import { YuklemeservisService } from './yuklemeservis.service';

describe('YuklemeservisService', () => {
  let service: YuklemeservisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YuklemeservisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
