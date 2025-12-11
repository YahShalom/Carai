import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Eye, Sparkles } from 'lucide-react';
import { ABOUT_DATA, COMPANY_MISSION, COMPANY_VISION, CORE_VALUES } from '../constants';
import SEO from './SEO';

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO 
        title="About Carai Agency | Caribbean AI Solutions"
        description="Learn about Carai Agency's mission, vision, and team behind premium AI-powered web solutions."
        url="https://carai.agency/about"
                breadcrumbs={[
                    { name: 'Home', url: 'https://carai.agency' },
                    { name: 'About', url: 'https://carai.agency/about' }
                ]}
      />
      {/* Header Image with Parallax & Animated Overlay */}
      <div 
        className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden parallax-bg"
        style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop")',
        }}
      >
        {/* Animated Background Layers */}
        <div className="absolute inset-0 bg-navy-900/40"></div>
        
        {/* Rotating Light Beam */}
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_60deg,rgba(212,175,55,0.07)_100deg,transparent_140deg)] animate-spin-slow pointer-events-none" style={{ animationDuration: '25s' }}></div>
        
        {/* Pulsing Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-silver-100/10 rounded-full blur-[80px] animate-float pointer-events-none" style={{ animationDuration: '8s' }}></div>

        {/* Gradient Fade for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent"></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 relative z-10">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-silver-300 hover:text-white mb-6 transition-colors font-medium group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Return Home
                </Link>
                <div className="flex items-center gap-3 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <Sparkles className="w-6 h-6 text-gold-400 animate-pulse" />
                    <span className="text-gold-500 font-bold tracking-widest uppercase text-sm">Our Story</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white shadow-black drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-backwards">
                    About Carai Agency
                </h1>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-20">
        
        {/* Extended Bio Section */}
        <section className="bg-white dark:bg-navy-800 p-8 md:p-12 rounded-3xl border border-gold-400/20 shadow-xl reveal">
            <h2 className="text-3xl font-display font-bold text-navy-900 dark:text-white mb-6">The Architect Behind the Code</h2>
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-navy-600 dark:text-silver-300 font-light leading-relaxed">
                <p>{ABOUT_DATA}</p>
                <p className="mt-4">
                    Founded on the principles of precision engineering and forward-thinking design, Carai Agency isn't just a development shop. It's an innovation hub tailored for the Caribbean and global markets. We believe that technology should serve humanity, not complicate it. By leveraging the latest advancements in Large Language Models (LLMs) and reactive frameworks, we are redefining what is possible on the web.
                </p>
                <p className="mt-4">
                    From the first line of code to the final deployment, every decision is made with the user's experience and the client's growth in mind.
                </p>
            </div>
        </section>

        {/* Mission & Vision Split */}
        <section className="grid md:grid-cols-2 gap-8 reveal">
            {/* Mission */}
            <div className="bg-gradient-to-br from-white to-silver-50 dark:from-navy-800 dark:to-navy-900 p-8 md:p-10 rounded-3xl border-2 border-gold-400/20 relative overflow-hidden group hover:border-gold-400 transition-colors duration-500">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Target className="w-32 h-32 text-gold-500" />
                </div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-gold-500/10 rounded-2xl flex items-center justify-center mb-6">
                        <Target className="w-6 h-6 text-gold-500" />
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-wider text-navy-900 dark:text-white mb-4">Our Mission</h3>
                    <p className="text-lg text-navy-600 dark:text-silver-300 leading-relaxed font-light">
                        {COMPANY_MISSION}
                    </p>
                </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-white to-silver-50 dark:from-navy-800 dark:to-navy-900 p-8 md:p-10 rounded-3xl border-2 border-gold-400/20 relative overflow-hidden group hover:border-gold-400 transition-colors duration-500">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Eye className="w-32 h-32 text-gold-500" />
                </div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-gold-500/10 rounded-2xl flex items-center justify-center mb-6">
                        <Eye className="w-6 h-6 text-gold-500" />
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-wider text-navy-900 dark:text-white mb-4">Our Vision</h3>
                    <p className="text-lg text-navy-600 dark:text-silver-300 leading-relaxed font-light">
                        {COMPANY_VISION}
                    </p>
                </div>
            </div>
        </section>

        {/* 7 Core Values */}
        <section className="reveal">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-navy-900 dark:text-white mb-4">7 Core Values</h2>
                <p className="text-navy-600 dark:text-silver-400 max-w-2xl mx-auto">
                    The fundamental principles that guide every line of code we write and every partnership we build.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {CORE_VALUES.map((value, idx) => (
                    <div 
                        key={idx} 
                        className="bg-white/50 dark:bg-navy-800/50 backdrop-blur-sm p-6 rounded-3xl border border-gold-400/10 hover:border-gold-400 hover:bg-white dark:hover:bg-navy-800 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-500/10"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-silver-100 dark:bg-navy-900 rounded-2xl text-gold-500 group-hover:scale-110 transition-transform duration-300">
                                <value.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 dark:text-white">{value.title}</h3>
                        </div>
                        <p className="text-navy-600 dark:text-silver-400 text-sm leading-relaxed">
                            {value.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>

        {/* CTA */}
        <div className="bg-gold-500 rounded-3xl p-12 text-center shadow-2xl shadow-gold-500/20 relative overflow-hidden reveal">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mb-6">Ready to build with these values?</h2>
                <p className="text-navy-900/80 text-lg mb-8 max-w-2xl mx-auto font-medium">
                    Let's collaborate to turn your vision into a digital reality powered by integrity and innovation.
                </p>
                <Link 
                    to="/" 
                    state={{ scrollTo: 'contact' }}
                    className="inline-flex items-center justify-center px-8 py-4 bg-navy-900 text-white font-bold uppercase tracking-wider rounded-full hover:bg-navy-800 transition-colors shadow-lg"
                >
                    Start a Project
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;