/**
 * Oxydise brand tokens — single source of truth.
 *
 * When you swap in the real assets, edit this file and the whole site updates.
 * Colors are also consumed by tailwind.config.js, so Tailwind utilities like
 * `bg-primary`, `text-accent`, `border-border` will reflect any changes here.
 */

const brand = {
  name: 'Oxydise',
  tagline: 'The official brand guidelines.',
  domain: 'brand.oxydise.com',

  colors: {
    bg:      { name: 'Charcoal',      hex: '#0E0D0C', rgb: '14 13 12',     usage: 'Page background' },
    surface: { name: 'Graphite',      hex: '#1A1816', rgb: '26 24 22',     usage: 'Cards, elevated surfaces' },
    border:  { name: 'Iron',          hex: '#2A2623', rgb: '42 38 35',     usage: 'Dividers, borders' },
    text:    { name: 'Parchment',     hex: '#F3EBDD', rgb: '243 235 221',  usage: 'Body text, headlines' },
    muted:   { name: 'Ash',           hex: '#9C9288', rgb: '156 146 136',  usage: 'Secondary text, captions' },
    primary: { name: 'Patina',        hex: '#4FA69C', rgb: '79 166 156',   usage: 'Primary actions, links' },
    accent:  { name: 'Oxide',         hex: '#C24A1E', rgb: '194 74 30',    usage: 'Highlights, emphasis' },
  },

  typography: {
    display: {
      family: 'Fraunces',
      fallback: 'Georgia, serif',
      weights: [400, 500, 600, 700],
      usage: 'Headlines, display, editorial moments',
    },
    sans: {
      family: 'Inter',
      fallback: 'system-ui, sans-serif',
      weights: [400, 500, 600],
      usage: 'Body, UI, navigation',
    },
    scale: [
      { name: 'Display',  size: '4.5rem',  line: '1.05', tracking: '-0.04em', weight: 500 },
      { name: 'H1',       size: '3rem',    line: '1.1',  tracking: '-0.03em', weight: 500 },
      { name: 'H2',       size: '2.25rem', line: '1.15', tracking: '-0.02em', weight: 500 },
      { name: 'H3',       size: '1.5rem',  line: '1.25', tracking: '-0.01em', weight: 500 },
      { name: 'Body L',   size: '1.125rem',line: '1.55', tracking: '0',       weight: 400 },
      { name: 'Body',     size: '1rem',    line: '1.6',  tracking: '0',       weight: 400 },
      { name: 'Caption',  size: '0.875rem',line: '1.5',  tracking: '0.01em',  weight: 500 },
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
        dont: 'Hey friend! Check out this sick new thing 🔥',
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
