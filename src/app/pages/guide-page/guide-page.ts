import { Component } from "@angular/core";

@Component({
  selector: "app-guide-page",
  imports: [],
  templateUrl: "./guide-page.html",
  styleUrl: "./guide-page.less",
})
export class GuidePage {
  isAuthorized: boolean = false;
}
