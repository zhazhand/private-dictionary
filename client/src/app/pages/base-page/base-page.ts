import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefaultListService } from '@services/get-default-list.service';
import { BaseTable } from '@reusable/base-table/base-table';
import { ControlPanel } from '@reusable/control-panel/control-panel';
import { LoaderComponent } from '@reusable/loader/loader.component';
import { EmptyListBlock } from '@reusable/empty-list-block/empty-list-block';
import {
  PageTitle,
  ToastClassName,
  defaultColumnName,
  defaultSearchParametr,
  irregularSearchParametr,
  routePath,
} from '@constants/constants';
import { ListItem } from '@interfaces/list-item.interface';
import { switchMap } from 'rxjs/operators';
import { searchSubstringMatches } from 'app/shared/utils';
import { RemovingOption } from '@interfaces/removing-option.interface';
import { CommonCRUDService } from '@services/common-crud.service';
import { ToastService } from '@services/toast.service';
import { GroupeOption } from '@interfaces/groupe-option.interface';
import { ProtectiveScreen } from '@reusable/protective-screen/protective-screen';

@Component({
  selector: 'app-base-page',
  imports: [
    LoaderComponent,
    BaseTable,
    ControlPanel,
    EmptyListBlock,
    ProtectiveScreen,
  ],
  templateUrl: './base-page.html',
  styleUrl: './base-page.less',
})
export class BasePage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private commonCRUDService: CommonCRUDService,
    private defauitListService: DefaultListService,
    private toastService: ToastService,
  ) {}

  @ViewChild(ControlPanel) controlPanel!: ControlPanel;

  items!: ListItem[];
  choiceAbility: boolean = false;
  excludePush: boolean = false;
  hideLoader: boolean = true;
  isProtectiveScreen: boolean = false;
  thName: string = defaultColumnName;
  search: string = '';
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
    this.fetchList();
  }

  onSearchWord(word: string): void {
    this.resetRemovable();
    this.search = word;
  }

  changeOrderBy(selectedType: string): void {
    this.orderBy = selectedType;
  }

  onProcessRemoving(option: RemovingOption): void {
    if (option.isDeleteCompletely) {
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

  fetchList(): void {
    this.commonCRUDService.fetch(this.parentRoutePath).subscribe({
      next: (resp) => (this.items = resp),
      error: (resp) => {
        this.toastService.show({
          text: resp.error.message || resp.statusText || resp,
          className: ToastClassName.error,
        });
        this.isProtectiveScreen = false;
      },
      complete: () => {
        this.hideLoader = true;
        this.isProtectiveScreen = false;
      },
    });
  }

  downloadDefaultList(): void {
    this.hideLoader = false;
    this.isProtectiveScreen = true;
    this.defauitListService
      .getList(this.parentRoutePath)
      .pipe(
        switchMap((response) => {
          const list = response;
          return this.commonCRUDService.createCollection(
            this.parentRoutePath,
            list as ListItem[],
          );
        }),
      )
      .subscribe({
        next: (resp) => {
          this.toastService.show({
            text: resp.message,
            className: ToastClassName.success,
            delay: 3000,
          });
        },
        error: (resp) => {
          this.toastService.show({
            text: resp.error.message || resp.statusText || resp,
            className: ToastClassName.error,
          });
          this.isProtectiveScreen = false;
        },
        complete: () => this.fetchList(),
      });
  }

  deleteCompletely(): void {
    const option = searchSubstringMatches(
      this.items,
      this.search,
      this.paramSearch,
    ).map((item) => {
      return { ...{ id: item._id }, ...{ removable: true } };
    });

    this.isProtectiveScreen = true;
    this.hideLoader = false;
    this.deleteGroupe(option);
  }

  deleteSelectively(): void {
    const option = this.items
      .filter((item) => item.removable)
      .map((item) => {
        return { ...{ id: item._id }, ...{ removable: item.removable } };
      });

    this.isProtectiveScreen = true;
    this.hideLoader = false;
    this.deleteGroupe(option);
  }

  deleteGroupe(option: GroupeOption[]): void {
    this.commonCRUDService
      .updateGroupe(this.parentRoutePath, option)
      .pipe(
        switchMap(() => {
          return this.commonCRUDService.delete(this.parentRoutePath);
        }),
      )
      .subscribe({
        next: (resp) => {
          this.toastService.show({
            text: resp.message,
            className: ToastClassName.success,
            delay: 3000,
          });
        },
        error: (resp) => {
          this.toastService.show({
            text: resp.error.message || resp.statusText || resp,
            className: ToastClassName.error,
          });
          this.isProtectiveScreen = false;
          this.hideLoader = true;
        },
        complete: () => this.fetchList(),
      });
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
  }

  isWarningShown(): boolean {
    return this.choiceAbility && !this.items.some((item) => item.removable);
  }
}
