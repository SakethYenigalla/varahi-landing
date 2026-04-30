import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Varahi Logo
 * -----------
 * A maroon + antique-gold monogram. Combines:
 *   • An ornate "V" stylised so the left stroke curves like a banana leaf
 *     (catering) and the right stroke is straighter, like a roof line
 *     (real estate).
 *   • A diya at the apex (auspicious South Indian motif).
 *   • Three kolam "pulli" (dots) — one each side, one centre-bottom.
 *   • A subtle bottom flourish.
 *
 * `size` controls the rendered px size. The internal viewBox is 120 × 120,
 * so the SVG scales crisply at any size.
 */
@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 120 120"
      role="img"
      aria-label="Varahi"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="varahiMaroon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#8E2424"/>
          <stop offset="100%" stop-color="#5C1414"/>
        </linearGradient>
        <linearGradient id="varahiGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#F4D58D"/>
          <stop offset="55%" stop-color="#D4A24C"/>
          <stop offset="100%" stop-color="#A87529"/>
        </linearGradient>
      </defs>

      <!-- Outer disc -->
      <circle cx="60" cy="60" r="58" fill="url(#varahiMaroon)"/>
      <!-- Gold inner ring -->
      <circle cx="60" cy="60" r="53" fill="none" stroke="url(#varahiGold)" stroke-width="0.8" opacity="0.85"/>
      <circle cx="60" cy="60" r="50" fill="none" stroke="url(#varahiGold)" stroke-width="0.4" opacity="0.6"/>

      <!-- Diya at top -->
      <g transform="translate(60 14)">
        <!-- Flame -->
        <path d="M 0 -6 Q -2 -2 0 2 Q 2 -2 0 -6 Z" fill="url(#varahiGold)"/>
        <!-- Lamp body -->
        <path d="M -7 4 Q 0 9 7 4 Q 5 7 0 7 Q -5 7 -7 4 Z" fill="url(#varahiGold)"/>
      </g>

      <!-- The ornate V -->
      <g fill="none" stroke="url(#varahiGold)" stroke-linecap="round">
        <!-- Left stroke: banana-leaf curve -->
        <path d="M 30 38 C 32 55, 42 78, 60 92"
              stroke-width="6"/>
        <!-- Right stroke: cleaner architectural line -->
        <path d="M 90 38 C 86 56, 76 78, 60 92"
              stroke-width="6"/>
        <!-- Tiny apex serif tying both strokes -->
        <path d="M 60 92 L 60 96"
              stroke-width="3"/>
      </g>

      <!-- Kolam pulli (decorative dots) -->
      <g fill="url(#varahiGold)">
        <circle cx="22" cy="60" r="1.8"/>
        <circle cx="98" cy="60" r="1.8"/>
        <circle cx="60" cy="104" r="1.8"/>
      </g>

      <!-- Bottom flourish -->
      <path d="M 38 100 Q 60 112 82 100"
            fill="none" stroke="url(#varahiGold)" stroke-width="1" opacity="0.7"/>
      <circle cx="38" cy="100" r="1.4" fill="url(#varahiGold)"/>
      <circle cx="82" cy="100" r="1.4" fill="url(#varahiGold)"/>
    </svg>
  `,
})
export class LogoComponent {
  @Input() size: number = 48;
}
