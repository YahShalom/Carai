'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { DemoApp } from '../data/demoApps';

export default function DemoLayout({
  demo,
  title,
  description,
  children,
}: {
  demo?: DemoApp;
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-20 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute left-0 top-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,_rgba(104,87,255,.18),_transparent_35%)] blur-3xl" />
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_80px_rgba(6,8,24,0.6)] backdrop-blur-3xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.32em] text-violet-300/70">Atelier AI demo</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title ?? demo?.title ?? 'Atelier AI Demo'}</h1>
              {description && <p className="max-w-2xl text-slate-300">{description}</p>}
            </div>
            <Link href="/demo-apps" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-violet-300/40 hover:bg-white/10">
              Back to demo gallery
            </Link>
          </div>
        </motion.div>

        {children}
      </div>
    </main>
  );
}
