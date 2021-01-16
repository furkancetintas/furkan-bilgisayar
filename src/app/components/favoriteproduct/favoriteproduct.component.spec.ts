import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteproductComponent } from './favoriteproduct.component';

describe('FavoriteproductComponent', () => {
  let component: FavoriteproductComponent;
  let fixture: ComponentFixture<FavoriteproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
