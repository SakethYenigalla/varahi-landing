import { Component } from '@angular/core';

/**
 * Villa Blueprint — decorative SVG floor plan.
 * Used as the right-hand visual on the hero. Reads as a "luxury architectural
 * blueprint" without needing a stock photo.
 */
@Component({
  selector: 'app-villa-blueprint',
  standalone: true,
  template: `
    <svg
      viewBox="0 0 400 500"
      class="w-full h-auto max-h-[420px]"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Modern villa architectural plan"
    >
      <!-- Grid -->
      <defs>
        <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.4" opacity="0.18"/>
        </pattern>
      </defs>

      <rect width="400" height="500" fill="url(#bp-grid)"/>

      <g stroke="currentColor" fill="none" stroke-linejoin="miter">

        <!-- Outer wall -->
        <rect x="40" y="60" width="320" height="380" stroke-width="3"/>
        <!-- Inner wall offset (double-line wall convention) -->
        <rect x="44" y="64" width="312" height="372" stroke-width="0.6" opacity="0.5"/>

        <!-- Internal partitions -->
        <line x1="40"  y1="220" x2="220" y2="220" stroke-width="2"/>
        <line x1="220" y1="60"  x2="220" y2="320" stroke-width="2"/>
        <line x1="220" y1="320" x2="360" y2="320" stroke-width="2"/>
        <line x1="120" y1="220" x2="120" y2="440" stroke-width="2"/>
        <line x1="120" y1="340" x2="220" y2="340" stroke-width="2"/>

        <!-- Door swings -->
        <g stroke-width="0.9" opacity="0.7">
          <!-- Living → Hall -->
          <path d="M 160 220 A 30 30 0 0 0 190 250"/>
          <line x1="160" y1="220" x2="190" y2="250"/>
          <!-- Master suite -->
          <path d="M 220 250 A 28 28 0 0 1 248 278"/>
          <line x1="220" y1="250" x2="248" y2="278"/>
          <!-- Kitchen -->
          <path d="M 80 340 A 24 24 0 0 1 104 364"/>
          <line x1="80" y1="340" x2="104" y2="364"/>
        </g>

        <!-- Window apertures (gaps shown as short double lines) -->
        <g stroke-width="2.2">
          <line x1="80"  y1="60" x2="130" y2="60"/>
          <line x1="270" y1="60" x2="320" y2="60"/>
          <line x1="40"  y1="120" x2="40" y2="170"/>
          <line x1="40"  y1="290" x2="40" y2="330"/>
          <line x1="360" y1="120" x2="360" y2="170"/>
          <line x1="360" y1="380" x2="360" y2="420"/>
          <line x1="170" y1="440" x2="220" y2="440"/>
        </g>

        <!-- Furniture: living -->
        <g stroke-width="0.9" opacity="0.7">
          <!-- Sofa L -->
          <rect x="240" y="80" width="100" height="22" rx="3"/>
          <rect x="240" y="80" width="22"  height="80" rx="3"/>
          <!-- Coffee table -->
          <rect x="280" y="120" width="40" height="22" rx="2"/>
          <!-- Console -->
          <rect x="240" y="180" width="100" height="14" rx="2"/>
        </g>

        <!-- Furniture: bedroom -->
        <g stroke-width="0.9" opacity="0.7">
          <rect x="260" y="240" width="80" height="60" rx="3"/>
          <line x1="260" y1="252" x2="340" y2="252"/>
          <rect x="245" y="248" width="12" height="12"/>
          <rect x="343" y="248" width="12" height="12"/>
        </g>

        <!-- Furniture: kitchen counters -->
        <g stroke-width="0.9" opacity="0.7">
          <rect x="44"  y="240" width="72" height="14"/>
          <rect x="44"  y="320" width="14" height="80"/>
          <circle cx="80"  cy="280" r="6"/>
          <circle cx="100" cy="280" r="6"/>
        </g>

        <!-- Dining -->
        <g stroke-width="0.9" opacity="0.7">
          <rect x="140" y="360" width="60" height="60" rx="2"/>
          <circle cx="170" cy="350" r="6"/>
          <circle cx="170" cy="430" r="6"/>
          <circle cx="130" cy="390" r="6"/>
          <circle cx="210" cy="390" r="6"/>
        </g>

        <!-- Stairs -->
        <g stroke-width="0.8" opacity="0.65">
          <rect x="124" y="240" width="90" height="80"/>
          <line x1="124" y1="250" x2="214" y2="250"/>
          <line x1="124" y1="260" x2="214" y2="260"/>
          <line x1="124" y1="270" x2="214" y2="270"/>
          <line x1="124" y1="280" x2="214" y2="280"/>
          <line x1="124" y1="290" x2="214" y2="290"/>
          <line x1="124" y1="300" x2="214" y2="300"/>
          <line x1="124" y1="310" x2="214" y2="310"/>
        </g>
      </g>

      <!-- Dimension callouts -->
      <g stroke="currentColor" fill="currentColor" stroke-width="0.6" opacity="0.55"
         font-family="Inter, system-ui" font-size="9" letter-spacing="0.5">
        <line x1="40"  y1="40" x2="360" y2="40" stroke-dasharray="0"/>
        <line x1="40"  y1="36" x2="40"  y2="44"/>
        <line x1="360" y1="36" x2="360" y2="44"/>
        <text x="200" y="34" text-anchor="middle" stroke="none">42'-0"</text>

        <line x1="380" y1="60" x2="380" y2="440"/>
        <line x1="376" y1="60" x2="384" y2="60"/>
        <line x1="376" y1="440" x2="384" y2="440"/>
        <text x="394" y="252" text-anchor="middle" transform="rotate(90 394 252)" stroke="none">52'-0"</text>
      </g>

      <!-- Room labels -->
      <g fill="currentColor" font-family="Inter, system-ui" font-size="9"
         letter-spacing="2" opacity="0.85" text-anchor="middle">
        <text x="290" y="148">LIVING</text>
        <text x="290" y="280">MASTER SUITE</text>
        <text x="80"  y="160">FOYER</text>
        <text x="80"  y="370">KITCHEN</text>
        <text x="170" y="396">DINING</text>
        <text x="290" y="380">VERANDA</text>
      </g>

      <!-- Title block & North arrow -->
      <g stroke="currentColor" fill="none" stroke-width="0.8" opacity="0.85">
        <rect x="40" y="460" width="320" height="28"/>
        <line x1="220" y1="460" x2="220" y2="488"/>
        <line x1="290" y1="460" x2="290" y2="488"/>
      </g>
      <g fill="currentColor" font-family="Inter, system-ui" font-size="8"
         letter-spacing="2" opacity="0.85">
        <text x="50"  y="478">VARAHI · GROUND PLAN</text>
        <text x="230" y="478">SCALE 1:100</text>
        <text x="300" y="478">DRG-V-01</text>
      </g>

      <!-- North arrow -->
      <g transform="translate(360 90)" stroke="currentColor" fill="currentColor" opacity="0.7">
        <circle r="11" fill="none" stroke-width="0.8"/>
        <path d="M 0 -8 L 4 6 L 0 3 L -4 6 Z" stroke="none"/>
        <text x="0" y="-13" text-anchor="middle" font-family="Inter" font-size="8" stroke="none">N</text>
      </g>
    </svg>
  `,
})
export class VillaBlueprintComponent {}
