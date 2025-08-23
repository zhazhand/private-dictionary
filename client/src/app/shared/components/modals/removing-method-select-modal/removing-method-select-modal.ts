import { Component, inject, Input } from "@angular/core";
import { removing } from "@constants/constants";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModal } from "@reusable/modals/confirmation-modal/confirmation-modal";

@Component({
  selector: "app-removing-method-select-modal",
  imports: [],
  templateUrl: "./removing-method-select-modal.html",
  styles: `
    .btn-close {
      &:focus {
        box-shadow: none;
      }
    }
  `,
})
export class RemovingMethodSelectModal {
  private modalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);

  @Input()
  data: any;

  message: string = removing.methodSelect;

  openModal() {
    const modalRef = this.modalService.open(ConfirmationModal);
    // Optionally, pass data to the modal component
    modalRef.componentInstance.word = this.data.removingItem;
    modalRef.result
      .then((result) => {
        if (result) {
          if (result.confirmation) {
            this.deleteComplitely();
          } else {
            this.activeModal.close();
          }
        }
      })
      .catch((e) => console.log(e));
  }

  deleteSelectively(): void {
    const option = { isDeleteSelectively: true };
    this.activeModal.close(option);
  }

  deleteComplitely(): void {
    const option = { isDeleteComplitely: true };
    this.activeModal.close(option);
  }

  cancelDelete(): void {
    const option = { isDeleteCancel: true };
    this.activeModal.close(option);
  }
}
