'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { DemoApp } from '../data/demoApps';

export default function DemoCard({ demo }: { demo: DemoApp }) {
  return (
    <motion.article whileHover={{ y: -6, scale: 1.01 }} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition duration-300 hover:border-violet-400/30">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-violet-200">{demo.category}</span>
        <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-slate-300">{demo.status}</span>
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-white">{demo.title}</h3>
        <p className="text-sm leading-7 text-slate-300">{demo.description}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {demo.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{tag}</span>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={`/demo-apps/${demo.slug}`} className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-400">
          View demo
        </Link>
        <a href={demo.externalUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-violet-400/30">
          External site
        </a>
      </div>
    </motion.article>
  );
}
