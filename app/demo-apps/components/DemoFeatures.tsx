'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { DemoApp } from '../data/demoApps';

export default function DemoFeatures({ demo, related }: { demo: DemoApp; related: DemoApp[] }) {
  return (
    <section className="grid gap-10 lg:grid-cols-[0.95fr_0.85fr]">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="glass-panel rounded-[2rem] border border-white/10 p-10 shadow-[0_40px_80px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.32em] text-violet-300/80">Capabilities</p>
          <h3 className="text-3xl font-semibold text-white">AI capabilities designed for enterprise storytelling.</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {demo.aiCapabilities.map((capability) => (
              <div key={capability} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="font-semibold text-white">{capability}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[1.75rem] bg-slate-900/90 p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-violet-300/80">Feature breakdown</p>
            <ul className="mt-4 space-y-3 text-slate-300">
              {demo.features.map((feature) => (
                <li key={feature} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="space-y-8">
        <div className="glass-panel rounded-[2rem] border border-white/10 p-8 shadow-[0_30px_70px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
          <p className="text-sm uppercase tracking-[0.32em] text-violet-300/80">Technology stack</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {demo.techStack.map((tech) => (
              <span key={tech} className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">{tech}</span>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-[0_30px_70px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-violet-300/80">Related demos</p>
              <h4 className="mt-3 text-2xl font-semibold text-white">Explore adjacent experiences</h4>
            </div>
            <Link href="/demo-apps" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-violet-300/40">
              Back to gallery
            </Link>
          </div>
          <div className="mt-6 space-y-4">
            {related.map((item) => (
              <Link key={item.slug} href={`/demo-apps/${item.slug}`} className="block rounded-3xl border border-white/10 bg-slate-900/90 p-5 transition hover:border-violet-400/40 hover:bg-slate-950/90">
                <p className="text-lg font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
