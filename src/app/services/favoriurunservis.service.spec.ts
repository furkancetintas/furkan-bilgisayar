import { TestBed } from '@angular/core/testing';

import { FavoriurunservisService } from './favoriurunservis.service';

describe('FavoriurunservisService', () => {
  let service: FavoriurunservisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriurunservisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
