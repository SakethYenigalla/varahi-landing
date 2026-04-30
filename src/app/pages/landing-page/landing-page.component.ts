import { Component } from '@angular/core';
import { HeaderComponent }   from '../../components/header/header.component';
import { HeroComponent }     from '../../components/hero/hero.component';
import { ServicesComponent } from '../../components/services/services.component';
import { WhyComponent }      from '../../components/why/why.component';
import { ContactComponent }  from '../../components/contact/contact.component';
import { FooterComponent }   from '../../components/footer/footer.component';

/**
 * LandingPageComponent
 * --------------------
 * Single-page layout matching "Varahi Home Simple.html":
 *   Header → Hero → Services → Why → Contact → Footer
 */
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    WhyComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-services />
      <app-why />
      <app-contact />
    </main>
    <app-footer />
  `,
})
export class LandingPageComponent {}
