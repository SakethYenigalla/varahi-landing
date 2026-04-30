import { Component } from '@angular/core';

interface WhyItem { num: string; title: string; body: string; }

/**
 * WhyComponent — three-up cards on cream-2 bg, numbered "— 01 —" eyebrow.
 */
@Component({
  selector: 'app-why',
  standalone: true,
  template: `
    <section id="why" class="bg-cream2 px-6 py-20">
      <div class="max-w-page mx-auto">
        <div class="section-head">
          <p class="eyebrow">Why Choose Varahi</p>
          <h2>A small business built on trust</h2>
          <p>We're just starting out — and that's why every customer matters to us.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mt-9">
          @for (item of items; track item.num) {
            <div class="bg-white border border-line rounded-[10px] p-7 text-left">
              <p class="text-[13px] text-gold font-bold m-0 mb-2.5"
                 style="letter-spacing: 0.3em;">— {{ item.num }} —</p>
              <h4 class="text-[18px] font-semibold m-0 mb-2 text-maroonDark">{{ item.title }}</h4>
              <p class="text-sm text-muted m-0 leading-relaxed">{{ item.body }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class WhyComponent {
  protected readonly items: WhyItem[] = [
    { num: '01', title: 'Family-Run',
      body: 'You speak directly with the Yenigalla family — not call centres or middlemen.' },
    { num: '02', title: 'Local Roots',
      body: 'Based in Vuyyuru, serving Krishna and Guntur districts with deep area knowledge.' },
    { num: '03', title: 'Honest Pricing',
      body: 'Clear quotes, no hidden charges, transparent paperwork from enquiry to handover.' },
  ];
}
