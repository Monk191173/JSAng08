import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NapoyiComponent } from './napoyi.component';

describe('NapoyiComponent', () => {
  let component: NapoyiComponent;
  let fixture: ComponentFixture<NapoyiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NapoyiComponent]
    });
    fixture = TestBed.createComponent(NapoyiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
