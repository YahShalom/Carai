'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { DemoApp } from '../demo-apps/data/demoApps';

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HomeShowcase({ demos }: { demos: DemoApp[] }) {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-20 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_center,_rgba(94,92,255,.18),_transparent_40%)] blur-3xl" />
      <motion.section initial="hidden" animate="visible" variants={heroVariants} transition={{ duration: 0.9, ease: 'easeOut' }} className="relative mx-auto flex max-w-6xl flex-col gap-8 text-center lg:text-left">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 px-8 py-10 shadow-[0_40px_120px_rgba(13,15,35,0.5)] backdrop-blur-xl sm:px-12">
          <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm text-violet-200 backdrop-blur-sm">
            Atelier AI for premium enterprise demos
          </span>
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
              Build a cinematic AI showcase with luxury polish.
            </h1>
            <p className="max-w-2xl text-lg tracking-normal text-slate-300 sm:text-xl">
              Discover AI product experiences that feel futuristic, minimal, and designed for high-end brands in fashion-tech, beauty, and concierge workflows.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-[auto_auto] justify-center lg:justify-start">
            <Link href="/demo-apps" className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(148,163,184,0.16)] transition hover:bg-white/15">
              Explore AI demos
            </Link>
            <a href="#workflow" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:text-white">
              View workflow
            </a>
          </div>
        </div>
      </motion.section>

      <section className="relative mx-auto mt-20 max-w-6xl space-y-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {demos.slice(0, 3).map((demo) => (
            <motion.article key={demo.id} whileHover={{ y: -6 }} className="glass group overflow-hidden rounded-[2rem] border border-white/10 p-6 transition duration-300">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-violet-200">
                  {demo.category}
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-slate-300">
                  {demo.status}
                </span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-white">{demo.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{demo.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {demo.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
