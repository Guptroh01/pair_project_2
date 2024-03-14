import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAlertComponent } from './delete-alert.component';

describe('DeleteAlertComponent', () => {
  let component: DeleteAlertComponent;
  let fixture: ComponentFixture<DeleteAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAlertComponent]
    });
    fixture = TestBed.createComponent(DeleteAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
