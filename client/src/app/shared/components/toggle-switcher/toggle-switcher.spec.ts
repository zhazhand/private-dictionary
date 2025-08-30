import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleSwitcher } from './toggle-switcher';

describe('ToggleSwitcher', () => {
  let component: ToggleSwitcher;
  let fixture: ComponentFixture<ToggleSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleSwitcher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
