import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassVisibilitySwitcher } from './pass-visibility-switcher';

describe('PassVisibilitySwitcher', () => {
  let component: PassVisibilitySwitcher;
  let fixture: ComponentFixture<PassVisibilitySwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassVisibilitySwitcher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassVisibilitySwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
