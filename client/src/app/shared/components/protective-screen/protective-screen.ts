import { Component } from "@angular/core";

@Component({
  selector: "app-protective-screen",
  template: `<div class="protective-screen"></div>`,
  styles: `
    :host {
      position: fixed;
      top: 0;
      left: 0;
      min-height: 100vh;
      min-width: 100vw;
      z-index: 1000;
      background-color: grey;
      opacity: 0.1;
    }
  `,
})
export class ProtectiveScreen {}
