import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Varahi Wordmark
 * ---------------
 * Recreates the Telugu wordmark from the original flyer:
 *   • "వారాహి" — display Telugu serif in deep maroon with a gold shadow + cream outline
 *   • "క్యాటరింగ్ & రియల్ ఎస్టేట్స్" — set inside a green pill banner with gold edge
 *   • Symmetric ornamental gold flourishes either side
 *
 * SVG means it scales infinitely and respects the brand palette without
 * requiring an image asset.
 *
 * Inputs:
 *   - width: rendered px width (height auto-scales). Defaults to 480.
 *   - showSubBanner: hide the green sub-banner if you only want the
 *     "వారాహి" mark (e.g. tight header use). Defaults to true.
 */
@Component({
  selector: 'app-wordmark',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.width]="width"
      viewBox="0 0 600 220"
      role="img"
      aria-label="Varahi Catering and Real Estates"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="wm-maroon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#A23A3A"/>
          <stop offset="55%" stop-color="#7B1F1F"/>
          <stop offset="100%" stop-color="#5C1414"/>
        </linearGradient>
        <linearGradient id="wm-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#F4D58D"/>
          <stop offset="55%" stop-color="#D4A24C"/>
          <stop offset="100%" stop-color="#A87529"/>
        </linearGradient>
        <linearGradient id="wm-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#1F6E4A"/>
          <stop offset="100%" stop-color="#0E3A26"/>
        </linearGradient>
      </defs>

      <!-- ════════ Top: "వారాహి" — drop shadow + cream outline + maroon fill ════════ -->
      <g font-family="'Noto Serif Telugu', 'Noto Sans Telugu', serif"
         font-weight="900"
         font-size="120"
         text-anchor="middle"
         letter-spacing="-2">

        <!-- Soft gold drop shadow -->
        <text x="302" y="113" fill="#A87529" opacity="0.55">వారాహి</text>
        <!-- Cream outline glow -->
        <text x="300" y="110" fill="none" stroke="#FBF5E6" stroke-width="6" stroke-linejoin="round">వారాహి</text>
        <!-- Gold inner stroke -->
        <text x="300" y="110" fill="none" stroke="url(#wm-gold)" stroke-width="2" stroke-linejoin="round">వారాహి</text>
        <!-- Maroon body -->
        <text x="300" y="110" fill="url(#wm-maroon)">వారాహి</text>
      </g>

      <!-- ════════ Decorative gold flourishes either side of the title ════════ -->
      <g stroke="url(#wm-gold)" fill="none" stroke-linecap="round" opacity="0.85">
        <!-- Left swirl -->
        <path d="M 20 60 Q 60 40 90 70 Q 70 90 50 75" stroke-width="1.5"/>
        <circle cx="50" cy="65" r="2.2" fill="url(#wm-gold)" stroke="none"/>
        <path d="M 12 95 L 80 95" stroke-width="0.8"/>

        <!-- Right swirl (mirrored) -->
        <path d="M 580 60 Q 540 40 510 70 Q 530 90 550 75" stroke-width="1.5"/>
        <circle cx="550" cy="65" r="2.2" fill="url(#wm-gold)" stroke="none"/>
        <path d="M 588 95 L 520 95" stroke-width="0.8"/>
      </g>

      <!-- ════════ Bottom: green pill banner with subtitle ════════ -->
      @if (showSubBanner) {
        <g>
          <!-- Outer gold border -->
          <rect x="60" y="148" width="480" height="56" rx="28"
                fill="none" stroke="url(#wm-gold)" stroke-width="2"/>
          <!-- Inner green pill -->
          <rect x="64" y="152" width="472" height="48" rx="24"
                fill="url(#wm-green)" stroke="#F4D58D" stroke-width="0.8"/>

          <!-- Subtitle text -->
          <text
            x="300" y="184"
            text-anchor="middle"
            font-family="'Noto Serif Telugu', 'Noto Sans Telugu', serif"
            font-weight="700"
            font-size="26"
            fill="#FBF5E6"
            letter-spacing="0.5"
          >క్యాటరింగ్ <tspan fill="#F4D58D">&amp;</tspan> రియల్ ఎస్టేట్స్</text>

          <!-- Tiny end-cap dots on banner -->
          <circle cx="60" cy="176" r="3" fill="url(#wm-gold)"/>
          <circle cx="540" cy="176" r="3" fill="url(#wm-gold)"/>
        </g>
      }
    </svg>
  `,
})
export class WordmarkComponent {
  @Input() width: number = 480;
  @Input() showSubBanner: boolean = true;
}
