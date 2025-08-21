import { Routes } from "@angular/router";
import { AuthGuard } from "app/core/classes/auth-guard.guard";
import { routePath } from "@constants/constants";
import { GuidePage } from "@pages/guide-page/guide-page";
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
  { path: irregular, component: BasePage, canActivate: [AuthGuard] },
  {
    path: `${irregular}/${routePath.new}`,
    component: ItemForm,
    canActivate: [AuthGuard],
  },
  { path: `${irregular}/${id}`, component: ItemForm, canActivate: [AuthGuard] },
  { path: vocabulary, component: BasePage, canActivate: [AuthGuard] },
  {
    path: `${vocabulary}/${routePath.new}`,
    component: ItemForm,
    canActivate: [AuthGuard],
  },
  {
    path: `${vocabulary}/${id}`,
    component: ItemForm,
    canActivate: [AuthGuard],
  },
  { path: separable, component: BasePage, canActivate: [AuthGuard] },
  {
    path: `${separable}/${routePath.new}`,
    component: ItemForm,
    canActivate: [AuthGuard],
  },
  { path: `${separable}/${id}`, component: ItemForm, canActivate: [AuthGuard] },
  { path: gerund, component: BasePage, canActivate: [AuthGuard] },
  {
    path: `${gerund}/${routePath.new}`,
    component: ItemForm,
    canActivate: [AuthGuard],
  },
  { path: `${gerund}/${id}`, component: ItemForm, canActivate: [AuthGuard] },
  { path: infinitive, component: BasePage, canActivate: [AuthGuard] },
  {
    path: `${infinitive}/${routePath.new}`,
    component: ItemForm,
    canActivate: [AuthGuard],
  },
  {
    path: `${infinitive}/${id}`,
    component: ItemForm,
    canActivate: [AuthGuard],
  },
  { path: phrases, component: BasePage, canActivate: [AuthGuard] },
  {
    path: `${phrases}/${routePath.new}`,
    component: ItemForm,
    canActivate: [AuthGuard],
  },
  { path: `${phrases}/${id}`, component: ItemForm, canActivate: [AuthGuard] },
  { path: stative, component: BasePage, canActivate: [AuthGuard] },
  {
    path: `${stative}/${routePath.new}`,
    component: ItemForm,
    canActivate: [AuthGuard],
  },
  { path: `${stative}/${id}`, component: ItemForm, canActivate: [AuthGuard] },
  { path: login, component: LoginPage },
  { path: registration, component: RegistrationPage },
  { path: "**", component: NotFoundPage },
];
