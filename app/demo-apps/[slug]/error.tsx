'use client';
import Link from 'next/link';

export default function DemoError({ error }: { error: Error }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center gap-6 px-6 py-24 text-center text-slate-200 sm:px-10">
      <p className="text-sm uppercase tracking-[0.32em] text-violet-300">Something went wrong</p>
      <h1 className="text-3xl font-semibold text-white">Failed to load the demo page.</h1>
      <p className="max-w-xl text-slate-400">{error.message || 'Please try again or return to the demo gallery.'}</p>
      <Link href="/demo-apps" className="rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-400">
        Back to demo gallery
      </Link>
    </div>
  );
}
