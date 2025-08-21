import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "@components/footer/footer.component";
import { HeaderComponent } from "@components/header/header.component";
import { ToastContainer } from "@components/toast-container/toast-container";

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
