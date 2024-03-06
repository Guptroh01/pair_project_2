import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNameComponent } from './item-name.component';

describe('ItemNameComponent', () => {
  let component: ItemNameComponent;
  let fixture: ComponentFixture<ItemNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemNameComponent]
    });
    fixture = TestBed.createComponent(ItemNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
