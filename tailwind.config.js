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
        panel: brand.colors.panel.hex,
        surface: brand.colors.surface.hex,
        line: brand.colors.line.hex,
        ink: brand.colors.ink.hex,
        muted: brand.colors.muted.hex,
        primary: brand.colors.primary.hex,
        accent: brand.colors.accent.hex,
      },
      fontFamily: {
        display: ['var(--font-display)', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04)',
        focus: '0 0 0 3px rgba(0,113,227,0.25)',
      },
    },
  },
  plugins: [],
};
