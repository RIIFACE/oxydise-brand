import { Urbanist, Manrope } from 'next/font/google';
import './globals.css';
import { brand } from '@/lib/brand.config';
import TopNav from '@/components/TopNav';
import GridOverlay from '@/components/GridOverlay';

const sans = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500'],
});

const display = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500'],
});

export const metadata = {
  title: `${brand.name} — Brand guidelines`,
  description: brand.tagline,
  metadataBase: new URL(`https://${brand.domain}`),
  openGraph: {
    title: `${brand.name} — Brand guidelines`,
    description: brand.tagline,
    url: `https://${brand.domain}`,
    siteName: `${brand.name} Brand`,
    type: 'website',
  },
};

// Runs before hydration to avoid a light→dark flash.
const themeScript = `(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(!s&&m))document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg text-ink font-sans">
        <GridOverlay />
        <div className="relative z-10 flex min-h-screen flex-col">
          <TopNav />
          <main className="flex-1">
            <div className="mx-auto w-full max-w-[1440px] px-6 md:pl-[272px] md:pr-10">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
