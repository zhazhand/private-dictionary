import { Component } from "@angular/core";

@Component({
  selector: "app-temporary-page",
  template: ` <div class="container">
    <div class="row align-items-center">
      <div class="col">
        <p class="text-center text-info">
          I'm sorry!<br />
          This page doesn't exist yet!<br />
          You should try to return here later.
        </p>
      </div>
    </div>
  </div>`,
  styles: `
    .container {
      z-index: -1;
      .row {
        height: 90vh;
        .text-info {
          font-weight: bold;
          font-size: 40px;
        }
      }
    }
  `,
})
export class TemporaryPage {}
