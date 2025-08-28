import { Component } from "@angular/core";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-footer",
  imports: [DatePipe],
  template: ` <div class="page-footer bg-primary fixed-bottom">
    <div class="footer-copyright text-center py-3">
      <img class="book" src="assets/images/book.webp" alt="opened book" />
      <span class="text-white current-year">© {{ now | date: "yyyy" }}</span>
    </div>
  </div>`,
  styles: `
    .book {
      max-width: 1.6rem;
      vertical-align: baseline;
    }
    .current-year {
      cursor: default;
    }
  `,
})
export class FooterComponent {
  now: number = Date.now();
}
