import React, { useEffect } from 'react';
import { SKILLS_DATA } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SkillsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header Image */}
      <div 
        className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden parallax-bg mb-20"
        style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1639322537228-ad7117a7a435?q=80&w=2532&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-navy-950/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 relative z-10">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-silver-300 hover:text-white mb-6 transition-colors font-medium group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Return Home
                </Link>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white shadow-black drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    Technical Expertise
                </h1>
                <p className="mt-4 text-xl text-silver-300 max-w-2xl font-light">
                    A comprehensive toolkit powering the next generation of intelligent web applications.
                </p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {SKILLS_DATA.map((category, idx) => (
            <div 
              key={idx} 
              className="group bg-white dark:bg-navy-800 border-2 border-gold-400/10 p-10 hover:border-gold-400 transition-all duration-300 shadow-xl rounded-3xl animate-in slide-in-from-bottom-8 fade-in fill-mode-backwards"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <h3 className="text-2xl font-display font-bold text-navy-900 dark:text-white mb-8 pb-4 border-b border-gold-400/20 flex justify-between items-center">
                {category.title}
                <div className="h-2 w-2 rounded-full bg-gold-500 shadow-[0_0_10px_#C59D24]"></div>
              </h3>
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="inline-block px-4 py-2 text-sm font-bold tracking-wider uppercase text-navy-700 dark:text-silver-300 bg-silver-100 dark:bg-navy-900 border border-gold-400/10 hover:text-gold-600 dark:hover:text-gold-400 hover:border-gold-400 transition-all rounded-xl hover:scale-105"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;