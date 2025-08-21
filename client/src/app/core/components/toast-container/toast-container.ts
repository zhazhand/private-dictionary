import { Component, inject } from "@angular/core";
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "@services/toast.service";

@Component({
  selector: "app-toast-container",
  imports: [NgbToastModule],
  templateUrl: "./toast-container.html",
  styleUrl: "./toast-container.less",
})
export class ToastContainer {
  readonly toastService = inject(ToastService);
}
