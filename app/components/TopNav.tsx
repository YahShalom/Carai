'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Demo Gallery', href: '/demo-apps' },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-4 z-50 mx-auto max-w-7xl px-4 sm:px-8">
      <nav className="glass-panel group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 px-5 py-4 shadow-[0_30px_90px_rgba(29,22,74,0.35)] backdrop-blur-2xl transition duration-500 before:absolute before:inset-0 before:-z-10 before:bg-gradient-radial before:from-violet-500/20 before:via-transparent before:to-transparent before:opacity-60">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-100 transition hover:text-white">
            Atelier AI
          </Link>
          <div className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium uppercase tracking-[0.24em] transition ${pathname === item.href ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/demo-apps"
            className="inline-flex items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-violet-100 transition hover:bg-violet-500/15 hover:text-white"
          >
            View gallery
          </Link>
        </div>
      </nav>
    </div>
  );
}
