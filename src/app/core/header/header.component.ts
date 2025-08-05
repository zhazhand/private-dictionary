import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { MenuItem } from "./menu-item.interface";
import { Subscription } from "rxjs";
import { AuthService } from "@services/auth.service";
import { UserInfoService } from "@services/user-info.service";
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from "@ng-bootstrap/ng-bootstrap";
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [NgbDropdownModule, NgbCollapseModule, RouterModule, RouterLink],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public menu: MenuItem[] = [
    { name: "Irregular verbs", path: "irregular", abilityToEscape: false },
    { name: "Private vocabulary", path: "vocabulary", abilityToEscape: false },
    {
      name: "Additionally",
      path: "additionally",
      abilityToEscape: false,
      children: [
        { name: "Separable", path: "separable", abilityToEscape: false },
        { name: "Gerund", path: "gerund", abilityToEscape: false },
        { name: "Infinitive", path: "infinitive", abilityToEscape: false },
        { name: "Phrases", path: "phrases", abilityToEscape: false },
        { name: "Stative", path: "stative", abilityToEscape: false },
      ],
    },
    { name: "Guide", path: "guide", abilityToEscape: false },
    {
      name: "Enter",
      path: "enter",
      abilityToEscape: false,
      children: [
        { name: "Login", path: "login", abilityToEscape: false },
        { name: "Registration", path: "registration", abilityToEscape: false },
      ],
    },
  ];
  exitMenuItem: MenuItem = {
    name: "Exit",
    path: "login",
    abilityToEscape: true,
  };
  enterMenuItem: MenuItem = {
    name: "Enter",
    path: "enter",
    abilityToEscape: false,
    children: [
      { name: "Login", path: "login", abilityToEscape: false },
      { name: "Registration", path: "registration", abilityToEscape: false },
    ],
  };

  public isMenuCollapsed: boolean = true;

  private readonly auth = inject(AuthService);
  private readonly userInfoService = inject(UserInfoService);

  ngOnInit(): void {
    if (localStorage.getItem("auth-token")) {
      this.menu.splice(-1, 1, this.exitMenuItem);
    }
    this.subscription.add(
      this.userInfoService.getUserInfo().subscribe((info) => {
        if (info) {
          this.menu.splice(-1, 1, this.exitMenuItem);
        }
      }),
    );
  }

  checkAbilityToEscape(param: boolean): void {
    this.isMenuCollapsed = true;
    if (param) {
      this.menu.splice(-1, 1, this.enterMenuItem);
      this.auth.logOut();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
