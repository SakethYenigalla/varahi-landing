import { Component } from '@angular/core';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';

/**
 * ContactComponent — section header + 2-column grid.
 * Left:  four info cards (phone, email, office, hours).
 * Right: <app-inquiry-form/>
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InquiryFormComponent],
  template: `
    <section id="contact" class="bg-white px-6 py-20 border-t border-line">
      <div class="max-w-page mx-auto">
        <div class="section-head">
          <p class="eyebrow">Get In Touch</p>
          <h2>Let's talk</h2>
          <p>Tell us about your event or property need — we typically reply within a few hours.</p>
        </div>

        <div class="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">

          <!-- Info cards -->
          <div>
            <!-- Phone -->
            <a href="tel:+917799246666"
               class="bg-cream border border-line rounded-[10px] p-6 mb-3.5 flex gap-4
                      no-underline text-ink hover:border-gold transition-colors">
              <span class="w-10 h-10 rounded-lg bg-maroon text-goldSoft grid place-items-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              <span class="block">
                <span class="block text-[11px] uppercase text-muted mb-1"
                      style="letter-spacing: 0.22em;">Call / WhatsApp</span>
                <span class="block text-[15px] text-maroon font-medium">+91 77992 46666</span>
              </span>
            </a>

            <!-- Email -->
            <a href="mailto:yenigalla1323@gmail.com"
               class="bg-cream border border-line rounded-[10px] p-6 mb-3.5 flex gap-4
                      no-underline text-ink hover:border-gold transition-colors">
              <span class="w-10 h-10 rounded-lg bg-maroon text-goldSoft grid place-items-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <span class="block min-w-0">
                <span class="block text-[11px] uppercase text-muted mb-1"
                      style="letter-spacing: 0.22em;">Email</span>
                <span class="block text-[15px] text-maroon font-medium break-all">
                  yenigalla1323&#64;gmail.com
                </span>
              </span>
            </a>

            <!-- Office -->
            <div class="bg-cream border border-line rounded-[10px] p-6 mb-3.5 flex gap-4">
              <span class="w-10 h-10 rounded-lg bg-maroon text-goldSoft grid place-items-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <span class="block">
                <span class="block text-[11px] uppercase text-muted mb-1"
                      style="letter-spacing: 0.22em;">Office</span>
                <span class="block text-[15px] text-ink leading-snug">
                  China-Ogirala Main Road,<br/>
                  Near Bus Stand, Vuyyuru,<br/>
                  Andhra Pradesh – 521245
                </span>
              </span>
            </div>

            <!-- Hours -->
            <div class="bg-cream border border-line rounded-[10px] p-6 flex gap-4">
              <span class="w-10 h-10 rounded-lg bg-maroon text-goldSoft grid place-items-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </span>
              <span class="block">
                <span class="block text-[11px] uppercase text-muted mb-1"
                      style="letter-spacing: 0.22em;">Hours</span>
                <span class="block text-[15px] text-ink">Mon – Sat · 9:00 AM – 8:00 PM</span>
              </span>
            </div>
          </div>

          <!-- Inquiry form -->
          <app-inquiry-form />
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {}
