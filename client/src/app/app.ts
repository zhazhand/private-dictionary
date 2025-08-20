import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./core/footer/footer.component";
import { HeaderComponent } from "./core/header/header.component";
import { ToastContainer } from "@reusable/toast-container/toast-container";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, FooterComponent, HeaderComponent, ToastContainer],
  template: `<app-header />
    <router-outlet />
    <app-footer />
    <app-toast-container aria-live="polite" aria-atomic="true" />`,
})
export class App {
  protected title = "private-dictionary";
}
