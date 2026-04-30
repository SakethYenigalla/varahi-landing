import { Component } from '@angular/core';

/**
 * ServicesComponent — "Two services. One family." section.
 * Two cards on white bg with maroon icon tile, Telugu sub-title, bullet list, gold CTA.
 */
@Component({
  selector: 'app-services',
  standalone: true,
  template: `
    <section id="services" class="bg-white px-6 py-20">
      <div class="max-w-page mx-auto">
        <div class="section-head">
          <p class="eyebrow">What We Offer</p>
          <h2>Two services. One family.</h2>
          <p>Quality catering for life's special moments and honest real-estate help for your future home.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">

          <!-- Catering -->
          <article class="bg-cream border border-line rounded-xl p-9
                          transition-all duration-200 hover:border-gold hover:-translate-y-0.5">
            <div class="w-12 h-12 rounded-[10px] bg-maroon text-goldSoft
                        grid place-items-center mb-4">
              <!-- utensils icon -->
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 2v7c0 1.1.9 2 2 2h2v11"/>
                <path d="M7 2v20"/>
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
              </svg>
            </div>
            <h3 class="text-[22px] font-bold m-0 mb-1 text-maroonDark">Catering</h3>
            <p class="te text-[15px] text-maroon mb-3.5">క్యాటరింగ్ సర్వీసులు</p>
            <p class="text-muted text-[15px] m-0 mb-4 leading-relaxed">
              Traditional Andhra meals for weddings, housewarmings, engagements and family events.
              Fresh on-site cooking with respect for your traditions.
            </p>
            <ul class="list-none p-0 m-0 mb-5">
              <li class="text-sm py-1.5 pl-6 relative text-ink border-b border-line">
                <span class="absolute left-0 top-1.5 text-gold font-bold">✓</span>
                Wedding banquets &amp; receptions
              </li>
              <li class="text-sm py-1.5 pl-6 relative text-ink border-b border-line">
                <span class="absolute left-0 top-1.5 text-gold font-bold">✓</span>
                Housewarming &amp; engagement feasts
              </li>
              <li class="text-sm py-1.5 pl-6 relative text-ink border-b border-line">
                <span class="absolute left-0 top-1.5 text-gold font-bold">✓</span>
                Birthdays &amp; festivals
              </li>
              <li class="text-sm py-1.5 pl-6 relative text-ink">
                <span class="absolute left-0 top-1.5 text-gold font-bold">✓</span>
                Banana-leaf meals &amp; live counters
              </li>
            </ul>
            <a href="#contact" class="btn-gold">Request a Quote →</a>
          </article>

          <!-- Real Estate -->
          <article class="bg-cream border border-line rounded-xl p-9
                          transition-all duration-200 hover:border-gold hover:-translate-y-0.5">
            <div class="w-12 h-12 rounded-[10px] bg-maroon text-goldSoft
                        grid place-items-center mb-4">
              <!-- home icon -->
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <h3 class="text-[22px] font-bold m-0 mb-1 text-maroonDark">Real Estate</h3>
            <p class="te text-[15px] text-maroon mb-3.5">స్థలములు &amp; పాలములు</p>
            <p class="text-muted text-[15px] m-0 mb-4 leading-relaxed">
              Open plots, independent houses and farm lands across Krishna district.
              Clear titles, transparent pricing, honest guidance from start to registration.
            </p>
            <ul class="list-none p-0 m-0 mb-5">
              <li class="text-sm py-1.5 pl-6 relative text-ink border-b border-line">
                <span class="absolute left-0 top-1.5 text-gold font-bold">✓</span>
                DTCP-approved open plots
              </li>
              <li class="text-sm py-1.5 pl-6 relative text-ink border-b border-line">
                <span class="absolute left-0 top-1.5 text-gold font-bold">✓</span>
                Independent houses &amp; villas
              </li>
              <li class="text-sm py-1.5 pl-6 relative text-ink border-b border-line">
                <span class="absolute left-0 top-1.5 text-gold font-bold">✓</span>
                Agricultural &amp; farm lands
              </li>
              <li class="text-sm py-1.5 pl-6 relative text-ink">
                <span class="absolute left-0 top-1.5 text-gold font-bold">✓</span>
                Title verification &amp; registration support
              </li>
            </ul>
            <a href="#contact" class="btn-gold">Enquire Now →</a>
          </article>
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {}
