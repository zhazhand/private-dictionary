import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';
import { HeaderComponent } from '@components/header/header.component';
import { ToastContainer } from '@components/toast-container/toast-container';
import { ScrollToTopButton } from '@components/scroll-to-top-button/scroll-to-top-button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    ToastContainer,
    ScrollToTopButton,
  ],
  template: ` <app-header />
    <router-outlet />
    <app-footer />
    <app-scroll-to-top-button />
    <app-toast-container aria-live="polite" aria-atomic="true" />`,
})
export class App {
  protected title = 'private-dictionary';
}
