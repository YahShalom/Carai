'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import DemoGrid from './DemoGrid';
import type { DemoApp } from '../data/demoApps';

export default function DemoAppsShowcase({ demos }: { demos: DemoApp[] }) {
  const featured = demos.filter((demo) => demo.featured);

  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-20 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute right-[-120px] top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(151,119,255,.23),_transparent_40%)] blur-3xl" />
      <section className="relative mx-auto max-w-6xl rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-[0_40px_90px_rgba(10,12,32,0.72)] backdrop-blur-3xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-violet-200">
              AI demo gallery
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">A premium showcase for AI-first products.</h1>
              <p className="max-w-xl text-lg text-slate-300">Discover the boutique Atelier AI experience: curated demos built to impress stakeholders and communicate product value with clarity.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/demo-apps/fashion-stylist" className="rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-400">Launch fashion stylist</Link>
              <Link href="/demo-apps/barber-vision" className="rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-300/30">Launch barber vision</Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
            <h2 className="text-xl font-semibold text-white">Featured demos</h2>
            <div className="mt-6 space-y-4">
              {featured.map((demo) => (
                <motion.div key={demo.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-[1.75rem] border border-white/10 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-violet-300">{demo.category}</p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{demo.title}</h3>
                    </div>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-slate-300">{demo.status}</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{demo.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950/70 to-slate-900/90 p-8 shadow-[0_40px_90px_rgba(7,9,23,0.7)] backdrop-blur-xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">Search and refine</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Find the AI demonstration that fits your enterprise workflow.</h2>
              <p className="mt-4 max-w-2xl text-slate-300">Filter by category, status, or technology to preview the most relevant luxury AI experience for your brand.</p>
            </div>
            <div className="flex flex-col items-start gap-4 rounded-[1.75rem] border border-white/10 bg-[#090713]/95 p-5 text-slate-300 sm:items-end">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Current launch cadence</p>
              <p className="text-3xl font-semibold text-white">3 tailored demo experiences</p>
              <span className="rounded-full bg-violet-500/10 px-4 py-2 text-sm text-violet-200">Updated daily for investor pitches</span>
            </div>
          </div>
          <DemoGrid demos={demos} />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-[0_40px_80px_rgba(8,10,28,0.7)] backdrop-blur-2xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr]">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">Premium invitation</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">A cinematic AI showcase built for modern enterprise buyers.</h2>
            <p className="max-w-xl text-slate-300">Every demo is designed to feel minimal, luxurious, and intelligent — from the first impression to the immersive preview and external launch.</p>
          </div>
          <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 text-slate-300">
            {['Luxury pacing', 'Responsive storytelling', 'Rich embed previews', 'External launch actions'].map((item) => (
              <div key={item} className="rounded-3xl bg-white/5 p-5">
                <p className="text-base font-semibold text-white">{item}</p>
                <p className="mt-2 text-sm leading-7 text-slate-400">A premium layer of design and product clarity for every AI demo experience.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
