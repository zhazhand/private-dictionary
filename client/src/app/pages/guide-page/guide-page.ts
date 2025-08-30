import { Component } from "@angular/core";
import { ToggleSwitcher } from "@reusable/toggle-switcher/toggle-switcher";

@Component({
  selector: "app-guide-page",
  imports: [ToggleSwitcher],
  templateUrl: "./guide-page.html",
  styleUrl: "./guide-page.less",
})
export class GuidePage {
  setLanguage(lang: string): void {
    console.log(lang);
  }
}
