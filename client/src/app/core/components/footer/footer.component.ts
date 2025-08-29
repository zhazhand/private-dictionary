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
  styleUrls: ["./footer.component.less"],
})
export class FooterComponent {
  now: number = Date.now();
}
