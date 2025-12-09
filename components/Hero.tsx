import React from 'react';
import { HERO_DATA } from '../constants';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section 
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden parallax-bg"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop")',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      {/* Overlay - Adaptation for light mode */}
      <div className="absolute inset-0 bg-white/70 dark:bg-navy-900/70 transition-colors duration-300 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 dark:via-navy-900/50 to-white dark:to-navy-900 mix-blend-normal dark:mix-blend-multiply z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center pb-20">
        
        {/* Main Content - Centered and Risen (via pb-20 on container) */}
        <div className="flex flex-col items-center justify-center reveal active">
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-gold-400/50 bg-white/50 dark:bg-navy-800/50 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.1)] animate-in fade-in slide-in-from-top-4 duration-1000">
              <Sparkles className="w-4 h-4 text-gold-500 animate-pulse" />
              <span className="text-gold-600 dark:text-gold-300 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-bold">Premier AI Solutions</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-extrabold tracking-tight mb-8 text-navy-900 dark:text-white leading-[1.1] drop-shadow-sm dark:drop-shadow-2xl transition-colors duration-300 animate-in zoom-in-50 duration-1000">
            <span className="block mb-2">Architecting</span>
            <span className="text-gradient-gold">
              Digital Intelligence
            </span>
          </h1>

          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl text-navy-800 dark:text-silver-200 font-light leading-relaxed drop-shadow-sm transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            {HERO_DATA.tagline}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Link 
              to="/portfolio"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-base font-bold text-navy-900 bg-gold-400 rounded-full transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] border-2 border-gold-300 overflow-hidden"
            >
              <span className="absolute w-full h-full bg-gradient-to-r from-gold-300 via-white/40 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 animate-shine"></span>
              <span className="relative flex items-center gap-2 tracking-wide uppercase text-sm">
                View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-5 text-base font-bold text-navy-700 dark:text-silver-100 bg-white/50 dark:bg-navy-800/50 border-2 border-gold-400/30 rounded-full hover:bg-white dark:hover:bg-navy-800 hover:border-gold-400 transition-all duration-300 backdrop-blur-sm tracking-wide uppercase text-sm"
            >
              Contact Me
            </Link>
          </div>
        </div>

      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-silver-100 dark:from-navy-900 to-transparent z-10 transition-colors duration-300"></div>
    </section>
  );
};

export default Hero;