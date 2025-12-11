import React from 'react';
import LazyImage from './LazyImage';
import { Link } from 'react-router-dom';
import { ABOUT_DATA, SectionId } from '../constants';
import { Code2, Brain, Rocket, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section 
      id={SectionId.ABOUT} 
      className="py-32 relative parallax-bg transition-colors duration-300"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop")',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/95 dark:bg-navy-900/95 transition-colors duration-300"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          
          <div className="relative mb-16 lg:mb-0 group reveal">
             <div className="relative overflow-hidden border-2 border-gold-400/30 shadow-2xl rounded-3xl">
                {/* Image Placeholder Frame */}
                <div className="w-full aspect-[4/5] bg-navy-100 dark:bg-navy-800 relative overflow-hidden rounded-3xl">
                    <LazyImage
                      src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop"
                      alt="Raphael Castellano"
                      className="w-full h-full object-cover opacity-90 dark:opacity-80 group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0 rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-navy-900/10 dark:bg-navy-900/20 mix-blend-multiply rounded-3xl"></div>
                </div>
                
                {/* Gold Frame Accent */}
                <div className="absolute -inset-2 border-2 border-gold-500/20 -z-10 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 rounded-3xl"></div>
             </div>
          </div>

          <div className="reveal">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 dark:text-white mb-8 transition-colors">
              Engineering the <span className="text-gradient-gold">Future</span>
            </h2>
            <div className="prose prose-lg prose-invert text-navy-600 dark:text-silver-300 mb-12 leading-relaxed font-light transition-colors">
              <p>{ABOUT_DATA}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-10">
              {[
                { icon: Code2, label: "Precision Engineering", desc: "Clean, scalable architectures built for longevity." },
                { icon: Brain, label: "Generative Intelligence", desc: "Seamless integration of Large Language Models." },
                { icon: Rocket, label: "High Performance", desc: "Optimized for speed and core web vitals." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 bg-silver-50/80 dark:bg-navy-800/60 backdrop-blur-sm border-2 border-gold-400/10 hover:border-gold-400 hover:bg-silver-100 dark:hover:bg-navy-800/80 transition-colors rounded-3xl">
                  <div className="p-2 bg-white dark:bg-navy-900 rounded-xl shadow-sm border border-gold-400/20">
                    <item.icon className="w-6 h-6 text-gold-500 dark:text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-1 transition-colors">{item.label}</h3>
                    <p className="text-navy-600 dark:text-silver-400 transition-colors">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link 
              to="/about"
              className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold uppercase tracking-wider text-sm border-b border-gold-400/30 pb-1 hover:border-gold-400 hover:text-gold-500 transition-all group"
            >
              Read Full Story, Mission & Values 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;