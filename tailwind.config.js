/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      'rgb(var(--color-bg) / <alpha-value>)',
        panel:   'rgb(var(--color-panel) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        line:    'rgb(var(--color-line) / <alpha-value>)',
        ink:     'rgb(var(--color-ink) / <alpha-value>)',
        muted:   'rgb(var(--color-muted) / <alpha-value>)',
        // Brand palette — constants in both themes
        primary: '#00AAFF',
        navy:    '#001540',
      },
      fontFamily: {
        display: ['var(--font-display)', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-sans)',    '-apple-system', 'BlinkMacSystemFont', 'SF Pro Text',    'system-ui', 'sans-serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: { tightest: '-0.04em' },
      boxShadow: {
        card:  '0 1px 2px rgba(0,0,0,0.04)',
        focus: '0 0 0 3px rgb(0 170 255 / 0.25)',
      },
    },
  },
  plugins: [],
};
