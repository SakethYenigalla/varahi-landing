import { Component } from '@angular/core';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ToastContainerComponent } from './components/toast/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingPageComponent, ToastContainerComponent],
  template: `
    <app-landing-page />
    <app-toast-container />
  `,
})
export class AppComponent {}
