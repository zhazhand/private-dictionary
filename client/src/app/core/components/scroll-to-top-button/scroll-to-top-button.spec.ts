import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollToTopButton } from './scroll-to-top-button';

describe('ScrollToTopButton', () => {
  let component: ScrollToTopButton;
  let fixture: ComponentFixture<ScrollToTopButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollToTopButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollToTopButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
