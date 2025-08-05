import { Routes } from "@angular/router";
import { routePath } from "@constants/constants";
import { GuidePage } from "@pages/guide-page/guide-page";
import { TemporaryPage } from "@pages/temporary-page/temporary-page";
import { NotFoundPage } from "@pages/not-found-page/not-found-page";
import { LoginPage } from "@pages/login-page/login-page";
import { RegistrationPage } from "@pages/registration-page/registration-page";
import { ItemForm } from "@reusable/item-form/item-form";
import { BasePage } from "@pages/base-page/base-page";

const {
  guide,
  irregular,
  vocabulary,
  separable,
  gerund,
  infinitive,
  phrases,
  stative,
  login,
  registration,
  id,
} = routePath;

export const routes: Routes = [
  { path: "", redirectTo: guide, pathMatch: "full" },
  { path: guide, component: GuidePage },
  { path: irregular, component: BasePage },
  { path: vocabulary, component: BasePage },
  { path: separable, component: BasePage },
  { path: gerund, component: BasePage },
  { path: infinitive, component: BasePage },
  { path: phrases, component: BasePage },
  { path: stative, component: TemporaryPage },
  { path: login, component: LoginPage },
  { path: registration, component: RegistrationPage },
  { path: `${vocabulary}/${routePath.new}`, component: ItemForm },
  { path: `${vocabulary}/${id}`, component: ItemForm },
  { path: "**", component: NotFoundPage },
];
