import React from 'react';
import { SKILLS_DATA, SectionId } from '../constants';

const Skills: React.FC = () => {
  return (
    <section 
      id={SectionId.SKILLS} 
      className="py-32 relative parallax-bg bg-navy-950"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1639322537228-ad7117a7a435?q=80&w=2532&auto=format&fit=crop")',
      }}
    >
      {/* Heavy Overlay - White in light mode, Dark in dark mode */}
      <div className="absolute inset-0 bg-white/90 dark:bg-navy-950/90 transition-colors duration-300"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 reveal">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 dark:text-white mb-6 transition-colors">Technical Arsenal</h2>
          <p className="text-navy-600 dark:text-silver-300 max-w-2xl mx-auto text-lg font-light transition-colors">
            A curated stack of technologies used to build robust, scalable, and intelligent applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS_DATA.map((category, idx) => (
            <div 
              key={idx} 
              className="group bg-white/60 dark:bg-navy-800/40 backdrop-blur-md border-2 border-gold-400/10 p-8 hover:bg-white/80 dark:hover:bg-navy-800/60 transition-all duration-300 reveal shadow-lg dark:shadow-none rounded-3xl hover:border-gold-400"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <h3 className="text-xl font-bold text-navy-900 dark:text-gold-100 mb-6 pb-4 border-b border-gold-400/20 group-hover:border-gold-500/50 transition-colors">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="inline-block px-3 py-1.5 text-xs font-bold tracking-wider uppercase text-navy-700 dark:text-silver-300 bg-white dark:bg-navy-900/80 border border-gold-400/20 hover:text-gold-600 dark:hover:text-gold-400 hover:border-gold-400 transition-colors rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;