import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CallVideoPage } from './call-video.page';

describe('CallVideoPage', () => {
  let component: CallVideoPage;
  let fixture: ComponentFixture<CallVideoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CallVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
