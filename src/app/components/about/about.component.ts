import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section id="about" class="section">
      <div class="container-narrow kolam-corners py-10">
        <span class="kolam-bl"></span>
        <span class="kolam-br"></span>

        <div class="text-center max-w-2xl mx-auto">
          <span class="eyebrow">About Varahi</span>
          <h2 class="h-display text-3xl sm:text-4xl mt-3">
            One trusted name. <span class="italic text-brand-maroon">Two specialised services.</span>
          </h2>
          <span class="gold-divider mt-5">✦</span>
          <p class="mt-5 text-brand-ink/75 leading-relaxed">
            Varahi is a family-run business serving our community with two complementary
            services — authentic catering for life's important moments, and reliable
            real-estate guidance for life's biggest decisions. Every plate we serve and
            every plot we sell carries the same promise: quality, transparency, and care.
          </p>
        </div>

        <div class="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="card p-7 text-center">
            <p class="font-display text-5xl font-bold text-brand-maroon">200+</p>
            <p class="mt-2 text-sm text-brand-ink/70 tracking-wider uppercase">Events catered</p>
          </div>
          <div class="card p-7 text-center">
            <p class="font-display text-5xl font-bold text-brand-maroon">15+</p>
            <p class="mt-2 text-sm text-brand-ink/70 tracking-wider uppercase">Years of trust</p>
          </div>
          <div class="card p-7 text-center sm:col-span-2 lg:col-span-1">
            <p class="font-display text-5xl font-bold text-brand-maroon">100+</p>
            <p class="mt-2 text-sm text-brand-ink/70 tracking-wider uppercase">Properties facilitated</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {}
