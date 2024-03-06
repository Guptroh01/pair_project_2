import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRiskComponent } from './create-risk.component';

describe('CreateRiskComponent', () => {
  let component: CreateRiskComponent;
  let fixture: ComponentFixture<CreateRiskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRiskComponent]
    });
    fixture = TestBed.createComponent(CreateRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
