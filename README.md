# Oxydise Brand

The official Oxydise brand guidelines site — intended to live at `brand.oxydise.com`.

Built with Next.js 14 (App Router) + Tailwind. Zero backend; everything is static.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Swapping in real brand assets

Everything flows from a single file: **`lib/brand.config.js`**.

- **Colors** — edit the `colors` object. Tailwind classes (`bg-primary`, `text-accent`, etc.) update automatically.
- **Typography** — change `typography.display.family` / `typography.sans.family` to any Google Font, then update the imports in `app/layout.jsx` (they use `next/font/google`).
- **Voice principles** — edit `voice.principles`.
- **Downloads** — edit the `downloads` array. Drop real files into `public/logos/` or `public/downloads/` so the `href` paths resolve.
- **Logo** — replace the placeholder SVG marks in `components/SiteNav.jsx` and `app/logo/page.jsx`, or better, add a real SVG/PNG file to `public/logos/` and update the components to `<Image>` it.

## Deploy to Vercel at `brand.oxydise.com`

### 1. Push to GitHub

From the project folder:

```bash
git init
git add .
git commit -m "Initial brand guide scaffold"
git branch -M main
```

Create a new repo on GitHub (web UI is fine — name it `oxydise-brand`), then:

```bash
git remote add origin https://github.com/<your-username>/oxydise-brand.git
git push -u origin main
```

### 2. Import into Vercel

1. Go to https://vercel.com/new
2. Select your `oxydise-brand` repo
3. Vercel auto-detects Next.js — keep the defaults and click **Deploy**

You'll get a free preview URL like `oxydise-brand.vercel.app`. Every push to `main` redeploys automatically.

### 3. Attach `brand.oxydise.com`

1. In the Vercel project: **Settings → Domains**
2. Add `brand.oxydise.com`
3. Vercel will show the DNS record it wants. Typically: a **CNAME** record at `brand` pointing to `cname.vercel-dns.com`.
4. Add that CNAME in your DNS provider (wherever `oxydise.com` is registered — Cloudflare, Namecheap, GoDaddy, etc.)
5. Wait 1–5 minutes. Vercel auto-issues a TLS cert.

Done. `https://brand.oxydise.com` is live.

### Subdomain-per-section (optional, later)

If you eventually want `colors.oxydise.com`, `logo.oxydise.com`, etc., there are two routes:

- **Single project, wildcard domain** — add `*.oxydise.com` in Vercel, then use Next.js middleware (`middleware.js`) to rewrite subdomain → path (e.g. `colors.oxydise.com` → `/colors`). One deploy, many subdomains.
- **Separate projects** — split each section into its own tiny Next.js project and connect each subdomain separately. Heavier to maintain.

Start with paths (`/colors`, `/logo` …). You can add the wildcard setup later without rewriting anything.

## Project structure

```
oxydise-brand/
├── app/
│   ├── layout.jsx         # Root layout, fonts, nav/footer
│   ├── page.jsx           # Home (brand.oxydise.com/)
│   ├── globals.css
│   ├── logo/              # /logo
│   ├── colors/            # /colors
│   ├── typography/        # /typography
│   ├── voice/             # /voice
│   ├── components/        # /components  (the UI block showcase)
│   └── downloads/         # /downloads
├── components/            # Shared React components
│   ├── SiteNav.jsx
│   ├── Footer.jsx
│   ├── ColorSwatch.jsx
│   ├── CopyButton.jsx
│   └── SectionHeader.jsx
├── lib/
│   └── brand.config.js    # ← edit this to swap in real brand tokens
├── public/                # Static assets (drop logos, PDFs here)
├── tailwind.config.js
├── next.config.mjs
└── package.json
```
