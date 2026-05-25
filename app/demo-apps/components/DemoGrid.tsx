'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { DemoApp } from '../data/demoApps';
import DemoCard from './DemoCard';

export default function DemoGrid({ demos }: { demos: DemoApp[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(demos.map((demo) => demo.category)))],
    [demos],
  );

  const filteredDemos = useMemo(() => {
    return demos.filter((demo) => {
      const matchesQuery = [demo.title, demo.description, demo.tags.join(' ')].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || demo.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, demos, query]);

  return (
    <section className="space-y-8">
      <div className="glass-panel grid gap-4 rounded-[1.75rem] border border-white/10 p-5 shadow-[0_30px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">Search demos</label>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search fashion, barber, concierge..."
            className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-5 py-3 text-slate-100 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20"
          />
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">Filter category</label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-5 py-3 text-slate-100 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20"
          >
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" layout>
          {filteredDemos.map((demo) => (
            <motion.div key={demo.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <DemoCard demo={demo} />
            </motion.div>
          ))}
          {filteredDemos.length === 0 && (
            <motion.div className="col-span-full rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 text-center text-slate-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-lg font-semibold text-white">No demos matched your search.</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">Try another keyword or clear the filter to browse every AI experience.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
