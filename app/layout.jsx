import { Inter } from 'next/font/google';
import './globals.css';
import { brand } from '@/lib/brand.config';
import Sidebar from '@/components/Sidebar';

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
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
    <html lang="en" className={sans.variable}>
      <body className="bg-bg text-ink font-sans">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 min-w-0">
            <div className="mx-auto max-w-5xl px-8 py-12 md:px-12 md:py-16">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
