import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./core/footer/footer.component";
import { HeaderComponent } from "./core/header/header.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  template: `<app-header /><router-outlet /><app-footer />`,
})
export class App {
  protected title = "private-dictionary";
}
