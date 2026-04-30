import { Component } from '@angular/core';

/**
 * HeroComponent — centered above-the-fold from "Varahi Home Simple.html".
 * Circular deity portrait → eyebrow → big H1 (Telugu + English) → sub copy → CTAs.
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="home"
             class="border-b border-line"
             style="background: linear-gradient(180deg, #FBF6EC 0%, #F4ECD8 100%); padding: 64px 24px 72px;">
      <div class="max-w-page mx-auto text-center">

        <!-- Deity portrait -->
        <div class="w-[140px] h-[140px] mx-auto mb-7 rounded-full overflow-hidden
                    border-[3px] border-gold"
             style="box-shadow:
                    0 0 0 6px rgba(184,138,46,0.15),
                    0 12px 32px -8px rgba(122,20,40,0.30);">
          <img src="assets/brand/varahi-deity.png" alt="Goddess Varahi"
               class="w-full h-full object-cover" style="object-position: 50% 35%;" />
        </div>

        <p class="eyebrow mb-3.5">Sri Varahi Devi · Blessed Beginnings</p>

        <h1 class="font-bold m-0 mb-2 text-maroonDark"
            style="font-size: clamp(36px, 6vw, 56px); letter-spacing: -0.01em; line-height: 1.05;">
          <span class="te block font-semibold text-maroon mb-1.5"
                style="font-size: 0.65em;">వారాహి</span>
          Catering &amp; Real Estates
        </h1>

        <p class="text-muted mx-auto mt-4 mb-8 max-w-[620px] text-[18px] leading-relaxed">
          A family-run business serving Vuyyuru and surrounding areas — authentic Andhra
          catering for your celebrations, and trusted real-estate guidance for your next plot or home.
        </p>

        <div class="flex gap-3 justify-center flex-wrap">
          <a href="#services" class="btn-primary">Our Services</a>
          <a href="#contact"  class="btn-outline">Get in Touch</a>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {}
