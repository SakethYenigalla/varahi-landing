import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-maroonDark text-footText pt-12 pb-5 px-6">
      <div class="max-w-page mx-auto grid gap-9 md:grid-cols-[1.4fr_1fr_1fr_1fr]">

        <!-- Brand -->
        <div>
          <div class="flex items-center gap-3">
            <span class="block w-10 h-10 rounded-full overflow-hidden border-2 border-goldSoft shrink-0">
              <img src="assets/brand/varahi-deity.png" alt="Varahi"
                   class="w-full h-full object-cover" style="object-position: 50% 35%;" />
            </span>
            <div>
              <p class="text-[18px] font-bold text-footText m-0">Varahi</p>
              <p class="text-[10px] uppercase opacity-70 m-0"
                 style="letter-spacing: 0.22em;">Catering &amp; Real Estates</p>
            </div>
          </div>
          <p class="text-sm leading-relaxed opacity-70 mt-3 m-0 max-w-[340px]">
            శ్రీ వారాహి దేవి ఆశీర్వాదంతో — A family-run business serving Krishna district
            with traditional catering and trusted real estate.
          </p>
        </div>

        <!-- Services -->
        <div>
          <h5 class="text-[13px] uppercase text-goldSoft m-0 mb-3 font-semibold"
              style="letter-spacing: 0.2em;">Services</h5>
          <ul class="list-none p-0 m-0 flex flex-col gap-2">
            <li><a href="#services" class="text-footText opacity-85 hover:opacity-100 hover:text-goldSoft text-sm no-underline">Catering</a></li>
            <li><a href="#services" class="text-footText opacity-85 hover:opacity-100 hover:text-goldSoft text-sm no-underline">Real Estate</a></li>
            <li><a href="#contact"  class="text-footText opacity-85 hover:opacity-100 hover:text-goldSoft text-sm no-underline">Get a Quote</a></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h5 class="text-[13px] uppercase text-goldSoft m-0 mb-3 font-semibold"
              style="letter-spacing: 0.2em;">Company</h5>
          <ul class="list-none p-0 m-0 flex flex-col gap-2">
            <li><a href="#why"     class="text-footText opacity-85 hover:opacity-100 hover:text-goldSoft text-sm no-underline">Why Us</a></li>
            <li><a href="#contact" class="text-footText opacity-85 hover:opacity-100 hover:text-goldSoft text-sm no-underline">Contact</a></li>
          </ul>
        </div>

        <!-- Reach Us -->
        <div>
          <h5 class="text-[13px] uppercase text-goldSoft m-0 mb-3 font-semibold"
              style="letter-spacing: 0.2em;">Reach Us</h5>
          <ul class="list-none p-0 m-0 flex flex-col gap-2">
            <li><a href="tel:+917799246666" class="text-footText opacity-85 hover:opacity-100 hover:text-goldSoft text-sm no-underline">+91 77992 46666</a></li>
            <li><a href="mailto:yenigalla1323@gmail.com" class="text-footText opacity-85 hover:opacity-100 hover:text-goldSoft text-sm no-underline break-all">yenigalla1323&#64;gmail.com</a></li>
            <li class="text-footText opacity-85 text-sm">Vuyyuru, AP – 521245</li>
          </ul>
        </div>
      </div>

      <!-- Bottom strip -->
      <div class="max-w-page mx-auto mt-9 pt-4 border-t border-footText/15
                  flex flex-wrap justify-between gap-2.5 text-xs opacity-60">
        <div>© {{ year }} Varahi Catering &amp; Real Estates</div>
        <div class="te">వారాహ్యై నమః</div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected year = new Date().getFullYear();
}
