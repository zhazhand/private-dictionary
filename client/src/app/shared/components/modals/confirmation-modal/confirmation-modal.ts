import { Component, inject, Input } from "@angular/core";
import { removing } from "@constants/constants";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-confirmation-modal",
  imports: [],
  templateUrl: "./confirmation-modal.html",
  styles: `
    .btn-close {
      &:focus {
        box-shadow: none;
      }
    }
  `,
})
export class ConfirmationModal {
  activeModal = inject(NgbActiveModal);

  @Input()
  word: string = "";
  @Input()
  text: string = removing.confirmation;

  confirmDelete(): void {
    const option = { confirmation: true };
    this.activeModal.close(option);
  }

  cancelDelete(): void {
    const option = { confirmation: false };
    this.activeModal.close(option);
  }
}
