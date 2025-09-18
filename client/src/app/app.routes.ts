import { Routes } from '@angular/router';
import { authGuard } from 'app/core/middleware/auth-guard.guard';
import { routePath } from '@constants/constants';
import { GuidePage } from '@pages/guide-page/guide-page';
import { NotFoundPage } from '@pages/not-found-page/not-found-page';
import { LoginPage } from '@pages/login-page/login-page';
import { RegistrationPage } from '@pages/registration-page/registration-page';
import { ItemForm } from '@reusable/item-form/item-form';
import { BasePage } from '@pages/base-page/base-page';

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
  { path: '', redirectTo: guide, pathMatch: 'full' },
  { path: guide, component: GuidePage },
  { path: irregular, component: BasePage, canActivate: [authGuard] },
  {
    path: `${irregular}/${routePath.new}`,
    component: ItemForm,
    canActivate: [authGuard],
  },
  { path: `${irregular}/${id}`, component: ItemForm, canActivate: [authGuard] },
  { path: vocabulary, component: BasePage, canActivate: [authGuard] },
  {
    path: `${vocabulary}/${routePath.new}`,
    component: ItemForm,
    canActivate: [authGuard],
  },
  {
    path: `${vocabulary}/${id}`,
    component: ItemForm,
    canActivate: [authGuard],
  },
  {
    path: separable,
    loadComponent: () =>
      import('@pages/base-page/base-page').then((m) => m.BasePage),
    canActivate: [authGuard],
  },
  {
    path: `${separable}/${routePath.new}`,
    loadComponent: () =>
      import('@reusable/item-form/item-form').then((m) => m.ItemForm),
    canActivate: [authGuard],
  },
  {
    path: `${separable}/${id}`,
    loadComponent: () =>
      import('@reusable/item-form/item-form').then((m) => m.ItemForm),
    canActivate: [authGuard],
  },
  {
    path: gerund,
    loadComponent: () =>
      import('@pages/base-page/base-page').then((m) => m.BasePage),
    canActivate: [authGuard],
  },
  {
    path: `${gerund}/${routePath.new}`,
    component: ItemForm,
    canActivate: [authGuard],
  },
  { path: `${gerund}/${id}`, component: ItemForm, canActivate: [authGuard] },
  {
    path: infinitive,
    loadComponent: () =>
      import('@pages/base-page/base-page').then((m) => m.BasePage),
    canActivate: [authGuard],
  },
  {
    path: `${infinitive}/${routePath.new}`,
    component: ItemForm,
    canActivate: [authGuard],
  },
  {
    path: `${infinitive}/${id}`,
    component: ItemForm,
    canActivate: [authGuard],
  },
  {
    path: phrases,
    loadComponent: () =>
      import('@pages/base-page/base-page').then((m) => m.BasePage),
    canActivate: [authGuard],
  },
  {
    path: `${phrases}/${routePath.new}`,
    loadComponent: () =>
      import('@reusable/item-form/item-form').then((m) => m.ItemForm),
    canActivate: [authGuard],
  },
  {
    path: `${phrases}/${id}`,
    loadComponent: () =>
      import('@reusable/item-form/item-form').then((m) => m.ItemForm),
    canActivate: [authGuard],
  },
  {
    path: stative,
    loadComponent: () =>
      import('@pages/base-page/base-page').then((m) => m.BasePage),
    canActivate: [authGuard],
  },
  {
    path: `${stative}/${routePath.new}`,
    component: ItemForm,
    canActivate: [authGuard],
  },
  { path: `${stative}/${id}`, component: ItemForm, canActivate: [authGuard] },
  { path: login, component: LoginPage },
  { path: registration, component: RegistrationPage },
  { path: '**', component: NotFoundPage },
];
