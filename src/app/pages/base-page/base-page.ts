import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DefaultListService } from "@services/get-default-list.service";
import { BaseTable } from "@reusable/base-table/base-table";
import { ControlPanel } from "@reusable/control-panel/control-panel";
import { LoaderComponent } from "@reusable/loader/loader.component";
import { EmptyListBlock } from "@reusable/empty-list-block/empty-list-block";
import {
  PageTitle,
  defaultColumnName,
  defaultSearchParametr,
  irregularSearchParametr,
  routePath,
} from "@constants/constants";
import { ListItem } from "@interfaces/list-item.interface";
import { map } from "rxjs/operators";
import { searchSubstringMatches } from "app/shared/utils";
import { RemovingOption } from "@interfaces/removing-option.interface";

@Component({
  selector: "app-base-page",
  imports: [LoaderComponent, BaseTable, ControlPanel, EmptyListBlock],
  templateUrl: "./base-page.html",
  styleUrl: "./base-page.less",
})
export class BasePage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private defauitListService: DefaultListService,
  ) {}

  @ViewChild(ControlPanel) controlPanel!: ControlPanel;

  items!: ListItem[];
  choiceAbility: boolean = false;
  excludePush: boolean = false;
  hideLoader: boolean = true;
  thName: string = defaultColumnName;
  search: string = "";
  paramSearch!: string;
  orderBy!: string;
  pageTitle!: string;
  parentRoutePath!: string;

  ngOnInit(): void {
    this.parentRoutePath = this.route.snapshot.url[0].path;
    this.pageTitle = PageTitle[this.parentRoutePath as keyof typeof PageTitle];
    this.paramSearch =
      this.parentRoutePath === routePath.irregular
        ? irregularSearchParametr
        : defaultSearchParametr;
    this.downloadDefaultList(); //temporary
  }

  onSearchWord(word: string): void {
    this.resetRemovable();
    this.search = word;
  }

  changeOrderBy(selectedType: string): void {
    this.orderBy = selectedType;
  }

  onProcessRemoving(option: RemovingOption): void {
    if (option.isDeleteComplitely) {
      this.deleteCompletely();
      this.controlPanel.clearField();
      return;
    }

    if (option.isDeleteCancel || option.confirmation === false) {
      this.resetRemovable();
      this.choiceAbility = false;
      return;
    }

    if (option.isDeleteSelectively && !this.choiceAbility) {
      this.setSelectivity();
      return;
    }

    if (option.confirmation === true) {
      this.deleteSelectively();
      this.controlPanel.clearField();
      this.choiceAbility = false;
    }
  }

  setSelectivity(): void {
    this.choiceAbility = true;
  }

  downloadDefaultList(): void {
    //should be deleted
    const base = Date.now();
    this.defauitListService
      .getList(this.parentRoutePath)
      .pipe(
        map((response: ListItem[]) => {
          return response.map((item: ListItem, index: number) => {
            return <any>{
              ...item,
              ...{ ["_id"]: (base + index).toString() },
              ...{ removable: false },
            };
          });
        }),
      )
      .subscribe((val) => (this.items = val));

    // this.defauitListService
    //   .getList(this.parentRoutePath)
    //   .subscribe((val) => (this.items = val));
  }

  deleteCompletely(): void {
    const removingItemIDs = searchSubstringMatches(
      this.items,
      this.search,
      this.paramSearch,
    ).map((item) => item._id);

    this.items = this.items.filter(
      (item) => !removingItemIDs.includes(item._id),
    );
  }

  deleteSelectively(): void {
    this.items = this.items.filter((item) => !item.removable); //temporary
  }

  setRemovable(data: { id: string; isRemovable: boolean }): void {
    searchSubstringMatches(this.items, this.search, this.paramSearch).find(
      (item) => {
        return item._id === data.id;
      },
    )!.removable = data.isRemovable;
  }

  resetRemovable(): void {
    this.items
      .filter((item) => item.removable)
      .forEach((item) => (item.removable = false));
  }

  changeAll(val: boolean): void {
    searchSubstringMatches(this.items, this.search, this.paramSearch).forEach(
      (item) => (item.removable = val),
    );
  }

  isDeleteButtonDisabled(): boolean {
    return !this.items.length;
    //  ||
    // (this.choiceAbility && !this.items.some((item) => item.removable))
  }

  isWarningShown(): boolean {
    return this.choiceAbility && !this.items.some((item) => item.removable);
  }
}
