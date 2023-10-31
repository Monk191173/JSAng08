import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousiComponent } from './sousi.component';

describe('SousiComponent', () => {
  let component: SousiComponent;
  let fixture: ComponentFixture<SousiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SousiComponent]
    });
    fixture = TestBed.createComponent(SousiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
