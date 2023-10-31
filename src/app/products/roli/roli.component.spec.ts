import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoliComponent } from './roli.component';

describe('RoliComponent', () => {
  let component: RoliComponent;
  let fixture: ComponentFixture<RoliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoliComponent]
    });
    fixture = TestBed.createComponent(RoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
