'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { DemoApp } from '../data/demoApps';

export default function DemoModal({ demo }: { demo: DemoApp }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-violet-300/40 hover:bg-white/10"
      >
        View capability brief
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-6 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} transition={{ duration: 0.18 }} className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-[0_50px_120px_rgba(0,0,0,0.4)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">Demo briefing</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{demo.title} overview</h2>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10">
                  Close
                </button>
              </div>
              <div className="mt-6 space-y-4 text-slate-300">
                <p>{demo.longDescription}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {demo.features.slice(0, 4).map((feature) => (
                    <div key={feature} className="rounded-3xl bg-white/5 p-4">
                      <p className="text-sm text-white">{feature}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-3xl bg-white/5 p-5 text-sm text-slate-300">
                  <p className="font-semibold text-white">Launch path</p>
                  <p className="mt-2">Use this demo to demonstrate how luxury AI can transform curated styling, live consultation, and executive concierge workflows for discerning audiences.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
