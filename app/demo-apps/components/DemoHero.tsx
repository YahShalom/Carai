'use client';

import { motion } from 'framer-motion';
import DemoModal from './DemoModal';
import type { DemoApp } from '../data/demoApps';

export default function DemoHero({ demo }: { demo: DemoApp }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-10 shadow-[0_40px_80px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-violet-200">{demo.category}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-slate-300">{demo.status}</span>
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{demo.title}</h2>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">{demo.longDescription}</p>
          <div className="flex flex-wrap gap-4">
            <a href={demo.externalUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-400">
              Launch external preview
            </a>
            <DemoModal demo={demo} />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.12 }} className="rounded-[2rem] border border-violet-500/10 bg-gradient-to-br from-violet-500/5 to-transparent p-7 shadow-[0_30px_80px_rgba(92,91,255,0.2)]">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/95 p-6 text-slate-300">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">AI innovation</p>
            <p className="mt-4 text-3xl font-semibold text-white">{demo.title.split(' ').slice(0, 2).join(' ')}</p>
            <p className="mt-4 leading-7 text-slate-300">An elegant overview of how the demo surfaces curated intelligence, visual storytelling, and actionable user journeys.</p>
            <div className="mt-6 grid gap-4">
              {demo.techStack.slice(0, 3).map((item) => (
                <div key={item} className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
