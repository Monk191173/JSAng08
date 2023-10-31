import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetuComponent } from './setu.component';

describe('SetuComponent', () => {
  let component: SetuComponent;
  let fixture: ComponentFixture<SetuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetuComponent]
    });
    fixture = TestBed.createComponent(SetuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
