import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistListItemComponent } from './shoppinglist-list-item.component';

describe('ShoppinglistListItemComponent', () => {
  let component: ShoppinglistListItemComponent;
  let fixture: ComponentFixture<ShoppinglistListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppinglistListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinglistListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
