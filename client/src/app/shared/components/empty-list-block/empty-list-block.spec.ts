import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyListBlock } from './empty-list-block';

describe('EmptyListBlock', () => {
  let component: EmptyListBlock;
  let fixture: ComponentFixture<EmptyListBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyListBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyListBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
