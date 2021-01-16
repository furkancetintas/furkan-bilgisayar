import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrundetayComponent } from './urundetay.component';

describe('UrundetayComponent', () => {
  let component: UrundetayComponent;
  let fixture: ComponentFixture<UrundetayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrundetayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrundetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
