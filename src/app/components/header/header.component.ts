import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavItem { id: string; label: string; }

/**
 * HeaderComponent — sticky top nav.
 * Implements the design's `header.nav` layout: deity-image logo on the left,
 * section links in the middle, "Contact Us" button on the right.
 *
 * Includes a small scroll-spy that highlights the active link as you scroll.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="sticky top-0 z-30 bg-cream border-b border-line">
      <div class="max-w-page mx-auto px-6 py-3.5 flex items-center gap-6">

        <!-- Brand: deity image + name -->
        <a href="#home" (click)="go($event, 'home')"
           class="flex items-center gap-3 no-underline text-ink">
          <span class="block w-11 h-11 rounded-full overflow-hidden border-2 border-gold
                       shadow-[0_2px_8px_rgba(122,20,40,0.15)] shrink-0">
            <img src="assets/brand/varahi-deity.png" alt="Varahi"
                 class="w-full h-full object-cover" style="object-position: 50% 35%;" />
          </span>
          <span class="leading-tight">
            <span class="block font-bold text-[18px] tracking-[0.01em]">Varahi</span>
            <span class="block text-[10px] uppercase text-muted mt-[3px]"
                  style="letter-spacing: 0.22em;">
              Catering &amp; Real Estates
            </span>
          </span>
        </a>

        <!-- Desktop links -->
        <nav class="hidden md:flex gap-1 ml-auto items-center">
          @for (item of navItems; track item.id) {
            <a [href]="'#' + item.id" (click)="go($event, item.id)"
               class="text-ink no-underline px-3.5 py-2 rounded-md text-sm font-medium
                      hover:text-maroon transition-colors"
               [class.text-maroon]="active() === item.id"
               [class.font-semibold]="active() === item.id">
              {{ item.label }}
            </a>
          }
        </nav>

        <!-- Contact CTA -->
        <a href="#contact" (click)="go($event, 'contact')"
           class="hidden md:inline-flex btn-primary ml-2">
          Contact Us
        </a>

        <!-- Mobile toggle -->
        <button type="button" (click)="open.set(!open())"
                class="md:hidden ml-auto p-2 rounded-md hover:bg-cream2"
                [attr.aria-expanded]="open()" aria-label="Toggle navigation">
          @if (open()) {
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          } @else {
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          }
        </button>
      </div>

      <!-- Mobile nav drawer -->
      @if (open()) {
        <div class="md:hidden border-t border-line bg-cream animate-fadeIn">
          <div class="px-6 py-3 flex flex-col gap-1">
            @for (item of navItems; track item.id) {
              <a [href]="'#' + item.id" (click)="go($event, item.id)"
                 class="px-3 py-2.5 text-sm rounded-md text-ink hover:bg-cream2"
                 [class.text-maroon]="active() === item.id"
                 [class.font-semibold]="active() === item.id">
                {{ item.label }}
              </a>
            }
            <a href="#contact" (click)="go($event, 'contact')"
               class="mt-2 btn-primary justify-center">Contact Us</a>
          </div>
        </div>
      }
    </header>
  `,
})
export class HeaderComponent implements OnInit {
  protected readonly navItems: NavItem[] = [
    { id: 'home',     label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'why',      label: 'Why Us' },
    { id: 'contact',  label: 'Contact' },
  ];

  protected readonly open   = signal(false);
  protected readonly active = signal<string>('home');

  ngOnInit(): void { this.updateActive(); }

  /** Smooth-scroll to the section + update active. */
  protected go(e: Event, id: string): void {
    e.preventDefault();
    this.open.set(false);
    this.active.set(id);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
    }
  }

  /** Scroll-spy — finds the topmost section that's above the viewport center. */
  @HostListener('window:scroll')
  protected updateActive(): void {
    const y = window.scrollY + 100;
    for (let i = this.navItems.length - 1; i >= 0; i--) {
      const el = document.getElementById(this.navItems[i].id);
      if (el && el.offsetTop <= y) {
        this.active.set(this.navItems[i].id);
        return;
      }
    }
  }
}
