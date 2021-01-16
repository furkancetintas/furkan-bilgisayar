/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UrunservisService } from './urunservis.service';

describe('Service: Urunservis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrunservisService]
    });
  });

  it('should ...', inject([UrunservisService], (service: UrunservisService) => {
    expect(service).toBeTruthy();
  }));
});
