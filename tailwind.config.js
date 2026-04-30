/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // Tokens taken directly from "Varahi Home Simple.html"
      colors: {
        maroon:      '#7A1428',
        maroonDark:  '#5A0A1F',
        gold:        '#B88A2E',
        goldSoft:    '#E6C97A',
        cream:       '#FBF6EC',
        cream2:      '#F4ECD8',
        ink:         '#2A1A14',
        muted:       '#6B5544',
        line:        '#E8DCC0',

        // Footer copy color from the design
        footText:    '#F0E0C0',
      },
      fontFamily: {
        sans:   ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        telugu: ['"Noto Serif Telugu"', 'Inter', 'serif'],
      },
      maxWidth: {
        page: '1180px',
      },
      letterSpacing: {
        eyebrow: '0.32em',
        sub:     '0.22em',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
