import { TestBed } from '@angular/core/testing';

import { ShoppinglistCoronaService } from './shoppinglist-corona.service';

describe('ShoppinglistCoronaService', () => {
  let service: ShoppinglistCoronaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppinglistCoronaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
