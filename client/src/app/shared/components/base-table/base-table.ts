import { Component, input, OnInit, output } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { ListFilterPipe } from "@pipes/list-filter/list-filter-pipe";
import { OrderByPipe } from "@pipes/order-by/order-by-pipe";
import { ListItem } from "@interfaces/list-item.interface";
import { searchSubstringMatches } from "app/shared/utils";
import { warningPopoverMessage } from "@constants/constants";
import { RemovingOption } from "@interfaces/removing-option.interface";

@Component({
  selector: "app-base-table",
  imports: [
    RouterLink,
    OrderByPipe,
    ListFilterPipe,
    CommonModule,
    NgbPopoverModule,
  ],
  templateUrl: "./base-table.html",
  styleUrl: "./base-table.less",
})
export class BaseTable implements OnInit {
  constructor(private route: ActivatedRoute) {}

  items = input.required<ListItem[]>();
  choiceAbility = input<boolean>();
  search = input.required<string>();
  paramSearch = input.required<string>();
  orderBy = input.required<string>();
  thName = input.required<string>();
  removeCandidate = output<{ id: string; isRemovable: boolean }>();
  changeAllState = output<boolean>();
  removing = output<RemovingOption>();

  linkName!: string;
  popoverMsg = warningPopoverMessage;

  ngOnInit() {
    this.linkName = `/${this.route.snapshot.url[0].path}`;
  }

  saveChanges(id: string, isRemovable: boolean): void {
    this.removeCandidate.emit({ id, isRemovable });
  }

  selectAll(val: boolean): void {
    this.changeAllState.emit(val);
  }

  isIndeterminate(): boolean {
    return (
      searchSubstringMatches(
        this.items(),
        this.search(),
        this.paramSearch(),
      ).some((item) => item.removable) && !this.isChecked()
    );
  }

  isChecked(): boolean {
    const filteredArray = searchSubstringMatches(
      this.items(),
      this.search(),
      this.paramSearch(),
    );

    return (
      !!filteredArray.length && filteredArray.every((item) => item.removable)
    );
  }

  isDisabled(): boolean {
    return !searchSubstringMatches(
      this.items(),
      this.search(),
      this.paramSearch(),
    ).length;
  }

  deleteCancel(): void {
    const option = { isDeleteCancel: true };
    this.removing.emit(option);
  }
}
