import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "@services/auth.service";
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from "@ng-bootstrap/ng-bootstrap";
import { Router, RouterLink, RouterModule } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { MenuItemName, routePath } from "@constants/constants";

@Component({
  selector: "app-header",
  imports: [
    NgbDropdownModule,
    NgbCollapseModule,
    RouterModule,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"],
})
export class HeaderComponent {
  public isUserAuthenticated!: Observable<boolean>;
  public isMenuCollapsed: boolean = true;

  constructor(
    private readonly auth: AuthService,
    private router: Router,
  ) {
    this.isUserAuthenticated = this.auth.getAuthenticationState();
  }

  additionallyMenu: string[] = [
    routePath.gerund,
    routePath.infinitive,
    routePath.phrases,
    routePath.separable,
    routePath.stative,
  ];

  defaultMenu: string[] = [
    routePath.guide,
    routePath.login,
    routePath.registration,
  ];

  authenticatedUserMenu: Array<string | string[]> = [
    routePath.guide,
    routePath.irregular,
    routePath.vocabulary,
    this.additionallyMenu,
  ];

  getMenuItemName(key: string | string[]): string {
    if (this.hasChildren(key)) {
      return MenuItemName.additionally;
    }
    return MenuItemName[key as keyof typeof MenuItemName];
  }

  hasChildren(item: string | string[]): boolean {
    return Array.isArray(item);
  }

  logOut(): void {
    this.isMenuCollapsed = true;
    this.auth.logOut();
    this.router.navigate([routePath.login]);
  }
}
