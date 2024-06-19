import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnternewotpComponent } from './enternewotp.component';

describe('EnternewotpComponent', () => {
  let component: EnternewotpComponent;
  let fixture: ComponentFixture<EnternewotpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnternewotpComponent]
    });
    fixture = TestBed.createComponent(EnternewotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
