import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<p class="text-danger text-center">This page is not found!</p>`,
  styles:`p {
              font-weight: bold;
              font-size: 5rem;
              margin-top: 35vh;
          }`
})
export class NotFoundPage {}
