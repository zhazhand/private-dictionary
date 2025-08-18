import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-primary my-loader" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`,
  styles: `.my-loader.spinner-border {
      animation: spinner-border 1.05s linear infinite;
    }`
})
export class LoaderComponent {}
