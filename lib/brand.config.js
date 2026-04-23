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
    primary: { name: 'Signal',    hex: '#00AAFF', dark: '#00AAFF', rgb: '0 170 255',    darkRgb: '0 170 255',    usage: 'Primary brand colour — links, focus, actions, headline emphasis',  role: 'brand', tier: 'primary' },
    navy:    { name: 'Deep Navy', hex: '#001540', dark: '#001540', rgb: '0 21 64',      darkRgb: '0 21 64',      usage: 'Secondary brand colour — dark surfaces, foundations, depth',       role: 'brand', tier: 'secondary' },
    sky:     { name: 'Sky',       hex: '#ADE4FF', dark: '#ADE4FF', rgb: '173 228 255',  darkRgb: '173 228 255',  usage: 'Supporting — soft fills, highlights, hover tints',                 role: 'brand', tier: 'supporting' },
    royal:   { name: 'Royal',     hex: '#003093', dark: '#003093', rgb: '0 48 147',     darkRgb: '0 48 147',     usage: 'Supporting — strong statements, button variants',                  role: 'brand', tier: 'supporting' },
    accent:  { name: 'Indigo',    hex: '#4040BF', dark: '#4040BF', rgb: '64 64 191',    darkRgb: '64 64 191',    usage: 'Supporting — gradients, tertiary accent',                          role: 'brand', tier: 'supporting' },
  },

  typography: {
    display: {
      family: 'Urbanist',
      fallback: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      weights: [500],
      defaultWeight: 500,
      usage: 'Page titles, section headers, display copy',
    },
    sans: {
      family: 'Manrope',
      fallback: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
      weights: [400, 500],
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
    tone: 'Calm, credible, and considered.',
    feel: {
      should: ['informed', 'reassured', 'in control'],
      shouldNot: ['overwhelmed', 'pressured', 'confused'],
    },
    principles: [
      {
        name: 'Trust',
        values: 'Clear, Transparent, Grounded',
        guidelines: [
          'Say what you mean, no exaggeration',
          'Avoid hype or inflated claims',
        ],
        do: ['Designed to support recovery and long-term health'],
        dont: ['Revolutionary breakthrough that changes everything instantly'],
      },
      {
        name: 'Empathy',
        values: 'Understanding, Not Preaching',
        guidelines: [
          'Speak with the customer, not at them',
          'Acknowledge their situation',
        ],
        do: ['If you’re dealing with ongoing fatigue or recovery challenges…'],
        dont: ['You need this to fix your health'],
      },
      {
        name: 'Curiosity',
        values: 'Educate, Don’t Overwhelm',
        guidelines: [
          'Explain just enough science',
          'Make people want to learn more',
        ],
        do: ['Energy starts at a cellular level—here’s what that means'],
        dont: ['Dense, verbose clinical explanations without context'],
      },
      {
        name: 'Detail',
        values: 'Precise, Thoughtful, Considered',
        guidelines: [
          'Use specific, meaningful language',
          'Avoid fluff',
        ],
        do: ['Non-invasive, clinically-informed technology'],
        dont: ['Amazing wellness solutions'],
      },
      {
        name: 'Innovation',
        values: 'Forward-Thinking',
        guidelines: ['Position as leading, but not flashy'],
        do: ['Advanced wellness technologies, made accessible'],
        dont: ['Next-gen biohacking hack'],
      },
      {
        name: 'Personal',
        values: 'Tailored, Human, Relationship-Led',
        guidelines: [
          'Guide people, not just sell to them',
          'Adapt to individual needs',
          'Be accessible and responsive',
        ],
        do: [
          'We take the time to understand your goals',
          'Every setup is tailored to your needs',
          'We’ll guide you through the process',
        ],
        dont: [
          'We’re a small team who care a lot ❤️',
          'Family-run business with passion',
        ],
      },
    ],
  },

  valuesMission: {
    headline: 'The values,',
    headlineTail: 'and the point.',
    intro:
      'Our values steer every decision — what to ship, what to say, how to show up. Our mission is the one sentence that keeps us honest about the long game.',
    mission: {
      label: 'Mission',
      statement:
        'Make non-invasive, clinically-informed wellness technology accessible to the people who need it most.',
    },
    values: [
      {
        name: 'Trust',
        description: 'Clear, transparent, grounded. Say what we mean, no exaggeration.',
      },
      {
        name: 'Empathy',
        description: 'Understand before prescribing. Meet people where they are.',
      },
      {
        name: 'Curiosity',
        description: 'Educate without overwhelming. Make people want to learn more.',
      },
      {
        name: 'Detail',
        description: 'Precise, thoughtful, considered. Sweat the small stuff.',
      },
      {
        name: 'Innovation',
        description: 'Forward-thinking, but never flashy. Lead with substance.',
      },
      {
        name: 'Personal',
        description: 'Tailored, human, relationship-led. Guide, don’t just sell.',
      },
    ],
  },

  proposition: {
    headline: 'The pitch,',
    headlineTail: 'in one line.',
    oneLiner:
      'Oxydise brings clinical-grade wellness technology into everyday recovery — without the clinical feel.',
    audience: 'For people managing ongoing fatigue, recovery, or long-term health.',
    pillars: [
      {
        title: 'Non-invasive by design',
        body: 'No needles, no meds, no downtime. The treatment fits into the day, not around it.',
      },
      {
        title: 'Clinically informed',
        body: 'Built on evidence that holds up. We cite, we measure, we refine.',
      },
      {
        title: 'Human by default',
        body: 'Every setup is tailored. We guide people through it, not at them.',
      },
      {
        title: 'Accessible, not exclusive',
        body: 'Advanced technology, priced and positioned so the people who need it most can actually use it.',
      },
    ],
    against: {
      label: 'Not this',
      items: [
        'Biohacking gimmicks for the already well',
        'Clinical jargon that excludes newcomers',
        'One-size-fits-all wellness',
      ],
    },
  },

  // /downloads is sourced from Supabase Storage (brand-downloads bucket).
  // Upload via /portal/admin → Upload (audience: Public).
};

module.exports = { brand };
