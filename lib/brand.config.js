/**
 * Oxydise brand tokens — single source of truth.
 *
 * Colors are split into two roles:
 *   - `surface` tokens flip light↔dark (driven by CSS vars in globals.css).
 *   - `brand` tokens are constants across themes.
 *
 * Tailwind utilities (`bg-bg`, `text-ink`, `bg-primary`, `text-navy`…)
 * are wired in tailwind.config.js.
 */

const brand = {
  name: 'Oxydise',
  tagline: 'The official brand guidelines.',
  domain: 'brand.oxydise.com',

  colors: {
    // Surfaces (dual-theme)
    bg:      { name: 'Canvas',   hex: '#FFFFFF', dark: '#0B0B0D', rgb: '255 255 255', darkRgb: '11 11 13',    usage: 'Page background',         role: 'surface' },
    panel:   { name: 'Mist',     hex: '#FBFBFD', dark: '#151518', rgb: '251 251 253', darkRgb: '21 21 24',    usage: 'Panels, subtle fills',    role: 'surface' },
    surface: { name: 'Fog',      hex: '#F5F5F7', dark: '#1D1D1F', rgb: '245 245 247', darkRgb: '29 29 31',    usage: 'Cards, hover states',     role: 'surface' },
    line:    { name: 'Hairline', hex: '#E5E5EA', dark: '#2C2C2E', rgb: '229 229 234', darkRgb: '44 44 46',    usage: 'Dividers, grid lines',    role: 'surface' },
    ink:     { name: 'Ink',      hex: '#1D1D1F', dark: '#F5F5F7', rgb: '29 29 31',    darkRgb: '245 245 247', usage: 'Headlines, body text',    role: 'surface' },
    muted:   { name: 'Slate',    hex: '#6E6E73', dark: '#98989D', rgb: '110 110 115', darkRgb: '152 152 157', usage: 'Secondary text, captions', role: 'surface' },

    // Brand palette (constants — same in light and dark)
    primary: { name: 'Signal',    hex: '#00AAFF', dark: '#00AAFF', rgb: '0 170 255',    darkRgb: '0 170 255',    usage: 'Primary brand colour — links, focus, emphasis', role: 'brand' },
    sky:     { name: 'Sky',       hex: '#ADE4FF', dark: '#ADE4FF', rgb: '173 228 255',  darkRgb: '173 228 255',  usage: 'Soft highlights, backgrounds, tints',          role: 'brand' },
    royal:   { name: 'Royal',     hex: '#003093', dark: '#003093', rgb: '0 48 147',     darkRgb: '0 48 147',     usage: 'Secondary emphasis, strong statements',        role: 'brand' },
    accent:  { name: 'Indigo',    hex: '#4040BF', dark: '#4040BF', rgb: '64 64 191',    darkRgb: '64 64 191',    usage: 'Tertiary accent, gradients',                   role: 'brand' },
    navy:    { name: 'Deep Navy', hex: '#001540', dark: '#001540', rgb: '0 21 64',      darkRgb: '0 21 64',      usage: 'Darkest brand tone — heavy UI, foundations',   role: 'brand' },
  },

  typography: {
    display: {
      family: 'Urbanist',
      fallback: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      weights: [500, 600, 700],
      defaultWeight: 500,
      usage: 'Page titles, section headers, display copy',
    },
    sans: {
      family: 'Manrope',
      fallback: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
      weights: [400, 500, 600],
      defaultWeight: 400,
      usage: 'Body copy, UI, everywhere else',
    },
    scale: [
      { name: 'Headline', family: 'display', size: 'clamp(3rem, 10vw, 9rem)', line: '0.95', tracking: '-0.04em',  weight: 500 },
      { name: 'Display',  family: 'display', size: '3.5rem',    line: '1.05', tracking: '-0.035em', weight: 500 },
      { name: 'H1',       family: 'display', size: '2.25rem',   line: '1.1',  tracking: '-0.025em', weight: 500 },
      { name: 'H2',       family: 'display', size: '1.75rem',   line: '1.2',  tracking: '-0.02em',  weight: 500 },
      { name: 'H3',       family: 'display', size: '1.25rem',   line: '1.35', tracking: '-0.01em',  weight: 500 },
      { name: 'Body L',   family: 'sans',    size: '1.0625rem', line: '1.55', tracking: '-0.005em', weight: 400 },
      { name: 'Body',     family: 'sans',    size: '0.9375rem', line: '1.55', tracking: '0',        weight: 400 },
      { name: 'Caption',  family: 'sans',    size: '0.8125rem', line: '1.45', tracking: '0',        weight: 500 },
    ],
  },

  voice: {
    principles: [
      {
        name: 'Considered, not clever',
        description: 'We choose substance over spectacle. Language earns its place.',
        do: 'A material that holds up over time.',
        dont: 'Game-changing, next-gen technology that will blow your mind.',
      },
      {
        name: 'Warm, not casual',
        description: 'We are confident and human without being flippant.',
        do: 'We made this for people who care about the details.',
        dont: 'Hey friend! Check out this sick new thing.',
      },
      {
        name: 'Clear, not corporate',
        description: 'Plain English, short sentences, active voice.',
        do: 'Ship faster. Break less.',
        dont: 'Leveraging synergistic workflows to drive stakeholder alignment.',
      },
    ],
  },

  downloads: [
    { name: 'Logo pack (SVG + PNG)',  href: '/logos/oxydise-logo-pack.zip',    note: 'Placeholder — replace with real zip' },
    { name: 'Brand guidelines (PDF)', href: '/downloads/oxydise-brand.pdf',    note: 'Placeholder — replace with real PDF' },
    { name: 'Font files',             href: '/downloads/oxydise-fonts.zip',    note: 'If self-hosting fonts' },
    { name: 'Social kit',             href: '/downloads/oxydise-social.zip',   note: 'Covers, avatars, templates' },
  ],
};

module.exports = { brand };
