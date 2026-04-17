const { brand } = require('./lib/brand.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: brand.colors.bg.hex,
        surface: brand.colors.surface.hex,
        border: brand.colors.border.hex,
        text: brand.colors.text.hex,
        muted: brand.colors.muted.hex,
        primary: brand.colors.primary.hex,
        accent: brand.colors.accent.hex,
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
};
