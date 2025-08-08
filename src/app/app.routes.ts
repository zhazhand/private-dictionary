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
  { path: `${irregular}/${routePath.new}`, component: ItemForm },
  { path: `${irregular}/${id}`, component: ItemForm },
  { path: vocabulary, component: BasePage },
  { path: `${vocabulary}/${routePath.new}`, component: ItemForm },
  { path: `${vocabulary}/${id}`, component: ItemForm },
  { path: separable, component: BasePage },
  { path: `${separable}/${routePath.new}`, component: ItemForm },
  { path: `${separable}/${id}`, component: ItemForm },
  { path: gerund, component: BasePage },
  { path: `${gerund}/${routePath.new}`, component: ItemForm },
  { path: `${gerund}/${id}`, component: ItemForm },
  { path: infinitive, component: BasePage },
  { path: `${infinitive}/${routePath.new}`, component: ItemForm },
  { path: `${infinitive}/${id}`, component: ItemForm },
  { path: phrases, component: BasePage },
  { path: `${phrases}/${routePath.new}`, component: ItemForm },
  { path: `${phrases}/${id}`, component: ItemForm },
  { path: stative, component: TemporaryPage },
  { path: login, component: LoginPage },
  { path: registration, component: RegistrationPage },
  { path: "**", component: NotFoundPage },
];
