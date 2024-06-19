import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginfooterComponent } from './loginfooter.component';

describe('LoginfooterComponent', () => {
  let component: LoginfooterComponent;
  let fixture: ComponentFixture<LoginfooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginfooterComponent]
    });
    fixture = TestBed.createComponent(LoginfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
