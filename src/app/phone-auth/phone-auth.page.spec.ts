import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhoneAuthPage } from './phone-auth.page';

describe('PhoneAuthPage', () => {
  let component: PhoneAuthPage;
  let fixture: ComponentFixture<PhoneAuthPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
