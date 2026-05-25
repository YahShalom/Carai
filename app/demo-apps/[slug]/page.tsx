import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllDemos, getDemoBySlug } from '../services/demoService';
import DemoLayout from '../components/DemoLayout';
import DemoHero from '../components/DemoHero';
import DemoPreview from '../components/DemoPreview';
import DemoFeatures from '../components/DemoFeatures';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const demo = await getDemoBySlug(params.slug);

  if (!demo) {
    return {
      title: 'Demo not found — Atelier AI',
      description: 'The requested Atelier AI demo was not found. Return to the demo gallery to continue exploring premium experiences.',
    };
  }

  return {
    title: `${demo.title} — Atelier AI Demo`,
    description: demo.longDescription,
    openGraph: {
      title: `${demo.title} — Atelier AI`,
      description: demo.description,
      type: 'website',
      url: `https://atelier-ai.example/demo-apps/${demo.slug}`,
      images: [
        {
          url: demo.thumbnail,
          width: 1200,
          height: 630,
          alt: demo.title,
        },
      ],
    },
  };
}

export default async function DemoPage({ params }: { params: { slug: string } }) {
  const demo = await getDemoBySlug(params.slug);
  const allDemos = await getAllDemos();
  const related = allDemos.filter((item) => item.slug !== params.slug).slice(0, 2);

  if (!demo) {
    return (
      <DemoLayout title="Demo not found" description="Return to the gallery to explore the latest Atelier AI experiences.">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 text-center text-slate-300">
          <p className="text-lg font-semibold text-white">We could not find that demo.</p>
          <p className="mt-4">The demo URL may be invalid or the experience has been moved.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/demo-apps" className="rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-400">
              Return to demos
            </Link>
          </div>
        </div>
      </DemoLayout>
    );
  }

  return (
    <DemoLayout demo={demo} title={demo.title} description={demo.description}>
      <DemoHero demo={demo} />
      <DemoPreview demo={demo} />
      <DemoFeatures demo={demo} related={related} />
    </DemoLayout>
  );
}
