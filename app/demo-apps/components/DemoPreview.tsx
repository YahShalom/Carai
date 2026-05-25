'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { DemoApp } from '../data/demoApps';

export default function DemoPreview({ demo }: { demo: DemoApp }) {
  const [hasError, setHasError] = useState(false);

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-10 shadow-[0_40px_80px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-violet-300/80">Embedded preview</p>
          <h3 className="mt-3 text-3xl font-semibold text-white">Live demo preview and fallback support</h3>
          <p className="mt-4 max-w-3xl text-slate-300">If the live embed is available, preview it directly inside the experience. Otherwise, launch the full demo through the external link.</p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300">Embed URL: {demo.embedUrl ? 'Available' : 'Unavailable'}</div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-8 rounded-[2rem] border border-white/10 bg-slate-900/90 p-2 shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
        {demo.embedUrl && !hasError ? (
          <div className="relative overflow-hidden rounded-[1.75rem] bg-black/80 pb-[56.25%]">
            <iframe
              src={demo.embedUrl}
              title={`${demo.title} preview`}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onError={() => setHasError(true)}
            />
          </div>
        ) : (
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-6 rounded-[1.75rem] border border-dashed border-white/10 bg-slate-950/80 p-8 text-center text-slate-300">
            <p className="text-lg font-semibold text-white">Preview unavailable</p>
            <p className="max-w-xl text-sm leading-7 text-slate-400">The embedded preview cannot be shown at this time. You can still open the demo in a separate window.</p>
            <a href={demo.externalUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-400">
              Open external demo
            </a>
          </div>
        )}
      </motion.div>
    </section>
  );
}
