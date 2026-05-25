import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import TopNav from './components/TopNav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Atelier AI — Premium AI Demo Showcase',
  description: 'Explore luxury AI demos for fashion, beauty, and concierge workflows with cinematic AI experiences.',
  metadataBase: new URL('https://atelier-ai.example'),
  openGraph: {
    title: 'Atelier AI',
    description: 'Premium AI demo showcase for fashion, beauty, and concierge workflows.',
    type: 'website',
    url: 'https://atelier-ai.example',
    images: [
      {
        url: 'https://atelier-ai.example/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Atelier AI premium showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atelier AI',
    description: 'Premium AI demo showcase for fashion, beauty, and concierge workflows.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-[#06040d] text-slate-100 antialiased`}>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(109,92,255,.18),_transparent_25%),radial-gradient(circle_at_10%_20%,_rgba(6,215,255,.14),_transparent_18%),linear-gradient(180deg,#050409,#090613)]">
          <div className="relative overflow-hidden px-0">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,_rgba(79,70,229,0.14),_transparent_18%),radial-gradient(circle_at_85%_10%,_rgba(14,165,233,0.12),_transparent_20%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-[18%] h-[420px] bg-[radial-gradient(circle,_rgba(255,255,255,0.08),_transparent_38%)] blur-3xl" />
            <TopNav />
            <main className="relative">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
