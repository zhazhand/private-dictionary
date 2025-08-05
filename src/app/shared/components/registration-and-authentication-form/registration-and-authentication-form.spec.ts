import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAndAuthenticationForm } from './registration-and-authentication-form';

describe('RegistrationAndAuthenticationForm', () => {
  let component: RegistrationAndAuthenticationForm;
  let fixture: ComponentFixture<RegistrationAndAuthenticationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationAndAuthenticationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationAndAuthenticationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
