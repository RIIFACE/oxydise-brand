import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { brand } from '@/lib/brand.config';
import SiteNav from '@/components/SiteNav';
import Footer from '@/components/Footer';

const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600'],
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans relative">
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
