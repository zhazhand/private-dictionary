import { Component, inject, input, OnInit, output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NgbModal, NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { SelectCategory } from "@interfaces/select-category.interface";
import { BrushIconComponent } from "@reusable/brush-icon/brush-icon.component";
import { RemovingMethodSelectModal } from "@reusable/modals/removing-method-select-modal/removing-method-select-modal";
import {
  defaultSelectedValue,
  removing,
  reservedSelectedValue,
  routePath,
  selectOptions,
  warningPopoverMessage,
} from "@constants/constants";
import { ConfirmationModal } from "@reusable/modals/confirmation-modal/confirmation-modal";
import { RemovingOption } from "@interfaces/removing-option.interface";

@Component({
  selector: "app-control-panel",
  imports: [BrushIconComponent, RouterLink, FormsModule, NgbPopoverModule],
  templateUrl: "./control-panel.html",
  styleUrl: "./control-panel.less",
})
export class ControlPanel implements OnInit {
  constructor(private route: ActivatedRoute) {}

  private modalService = inject(NgbModal);
  choiceAbility = input<boolean>();
  excludePush = input<boolean>();
  isDisabled = input<boolean>(false);
  isPopoverShown = input<boolean>(false);
  pageTitle = input<string>();

  searchWord!: string;
  linkName!: string;
  category: SelectCategory[] | null = null;
  selectedCategory!: string;
  defaultSelectedCategory!: string;
  popoverMsg = warningPopoverMessage;

  takenWord = output<string>();
  takenType = output<string>();
  removingMethod = output<RemovingOption>();

  ngOnInit() {
    const currentRoute = this.route.snapshot.url[0].path;
    this.category = selectOptions;

    if (currentRoute === routePath.irregular) {
      this.defaultSelectedCategory = reservedSelectedValue;
      this.category.find((item) => item.type === "alphabet")!.value =
        reservedSelectedValue;
    } else {
      this.defaultSelectedCategory = defaultSelectedValue;
      this.category.find((item) => item.type === "alphabet")!.value =
        this.defaultSelectedCategory = defaultSelectedValue;
    }

    this.onSelect(this.defaultSelectedCategory);
    this.linkName = `/${currentRoute}/new`;
  }

  onFieldChange(model: string): void {
    this.searchWord = model;
    this.takenWord.emit(model);
  }

  onSelect(model: string): void {
    this.selectedCategory = model;
    this.takenType.emit(model);
  }

  onProcessRemoving(): void {
    if (this.isPopoverShown()) {
      return;
    }
    if (this.choiceAbility()) {
      this.openConfirmationModal();
    } else {
      this.openRemovingMethodSelectModal();
    }
  }

  openRemovingMethodSelectModal(): void {
    const modalRef = this.modalService.open(RemovingMethodSelectModal);
    modalRef.componentInstance.data = {
      title: this.pageTitle(),
      removingItem: removing.item.list,
    };
    modalRef.result
      .then((result) => {
        if (result) {
          this.removingMethod.emit(result);
        }
      })
      .catch((e) => console.log(e));
  }

  openConfirmationModal(): void {
    const modalRef = this.modalService.open(ConfirmationModal);
    modalRef.componentInstance.word = removing.item.selectedItems;
    modalRef.result.then((result) => {
      if (result) {
        this.removingMethod.emit(result);
      }
    });
  }

  deleteCancel(): void {
    const option = { isDeleteCancel: true };
    this.removingMethod.emit(option);
  }

  clearField(): void {
    this.onFieldChange("");
  }
}
