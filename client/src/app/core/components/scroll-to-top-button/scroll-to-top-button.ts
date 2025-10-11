import { Component, inject } from '@angular/core';
import { ViewportScroller, DOCUMENT, AsyncPipe } from '@angular/common';
import { fromEvent, map, Observable } from 'rxjs';

@Component({
  selector: 'app-scroll-to-top-button',
  imports: [AsyncPipe],
  templateUrl: './scroll-to-top-button.html',
  styleUrl: './scroll-to-top-button.less',
})
export class ScrollToTopButton {
  private readonly viewport: ViewportScroller = inject(ViewportScroller);
  private readonly document = inject(DOCUMENT);

  readonly isButtonShown: Observable<boolean> = fromEvent(
    this.document,
    'scroll',
  ).pipe(map(() => this.viewport.getScrollPosition()?.[1] > 0));

  scrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }
}
