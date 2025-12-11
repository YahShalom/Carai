import React from 'react';
import SEO from './SEO';
import { socialChannels, testimonials, faqs } from '../lib/insightsData';
import { ExternalLink } from 'lucide-react';

const InsightsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO
        title="Insights | Carai Agency"
        description="Content hub for Carai Agency – social highlights, client reviews, and answers to common questions."
        url="https://carai.agency/insights"
      />

      {/* Hero */}
      <div className="relative h-[30vh] md:h-[35vh] w-full overflow-hidden parallax-bg mb-12">
        <div className="absolute inset-0 bg-navy-900/40"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Insights & Content Hub</h1>
            <p className="text-silver-300 max-w-3xl">See what we’re sharing across social, what clients are saying, and answers to the questions we get the most.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Highlights */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-navy-900 dark:text-white mb-6">Social Content Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialChannels.map((c) => (
              <div key={c.id} className="bg-white dark:bg-navy-800 border-2 border-gold-400/10 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 dark:text-white">{c.name}</h3>
                    <p className="text-sm text-navy-600 dark:text-silver-400 mt-2">{c.description}</p>
                    {c.handle && <div className="text-sm mt-2 text-navy-500 dark:text-silver-400">{c.handle}</div>}
                  </div>
                  <div className="text-navy-400 dark:text-silver-500 text-sm font-bold">{c.tag}</div>
                </div>
                <div className="mt-4">
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 px-4 bg-navy-900 dark:bg-white text-white dark:text-navy-900 rounded-full text-xs font-bold hover:bg-gold-500 transition-colors">
                    {c.cta || `View on ${c.name}`} <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-navy-900 dark:text-white mb-6">What Clients Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="bg-white dark:bg-navy-800 border-2 border-gold-400/10 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold">{t.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold text-navy-900 dark:text-white">{t.name}</h4>
                    <p className="text-xs text-gold-600 uppercase tracking-wider">{t.source}</p>
                  </div>
                </div>
                <blockquote className="mt-4 text-navy-700 dark:text-silver-300 italic">“{t.quote}”</blockquote>
                <div className="mt-4">
                  <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gold-500 font-bold inline-flex items-center gap-2">View original <ExternalLink className="w-4 h-4" /></a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="mb-24">
          <h2 className="text-3xl font-display font-bold text-navy-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.id} className="bg-white dark:bg-navy-800 border-2 border-gold-400/10 rounded-2xl p-4">
                <summary className="cursor-pointer font-bold text-navy-900 dark:text-white list-none">{f.question}</summary>
                <div className="mt-3 text-navy-700 dark:text-silver-300">{f.answer}</div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default InsightsPage;
