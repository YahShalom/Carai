import React, { useState } from 'react';
import { SOCIAL_LINKS, SectionId } from '../constants';
import { Mail, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      // Reset after 3 seconds
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <section 
      id={SectionId.CONTACT} 
      className="py-32 relative parallax-bg"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop")',
      }}
    >
       {/* Overlay */}
       <div className="absolute inset-0 bg-white/90 dark:bg-navy-950/90 transition-colors duration-300"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/80 dark:bg-navy-900/80 border-2 border-gold-400/20 p-10 md:p-16 backdrop-blur-xl shadow-2xl reveal rounded-3xl">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-navy-900 dark:text-white mb-4 transition-colors">Let's Collaborate</h2>
            <p className="text-navy-600 dark:text-silver-300 text-lg font-light transition-colors">
              Ready to elevate your digital presence?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-10">
                <div>
                    <h3 className="text-lg font-bold text-gold-500 dark:text-gold-400 mb-6 uppercase tracking-wider">Connect</h3>
                    <div className="space-y-4">
                        {SOCIAL_LINKS.map((link) => (
                        <a 
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 text-navy-600 dark:text-silver-300 hover:text-navy-900 dark:hover:text-white transition-colors group"
                        >
                            <div className="p-3 bg-silver-100 dark:bg-navy-800 border border-gold-400/10 group-hover:border-gold-500/50 transition-colors rounded-full">
                                <link.icon className="w-5 h-5 text-navy-700 dark:text-silver-300 group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors" />
                            </div>
                            <span className="font-medium">{link.label}</span>
                        </a>
                        ))}
                    </div>
                </div>

                <div className="p-8 bg-gradient-to-br from-silver-100 to-white dark:from-navy-800 dark:to-navy-900 border-2 border-gold-400/20 transition-colors rounded-3xl">
                    <h4 className="text-navy-600 dark:text-silver-200 font-medium mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gold-500" /> Direct Email
                    </h4>
                    <a href="mailto:raphael@example.com" className="text-2xl font-bold text-navy-900 dark:text-white hover:text-gold-500 dark:hover:text-gold-400 transition-colors font-display">
                        raphael@example.com
                    </a>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Name</label>
                        <input type="text" id="name" required className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-4 text-navy-900 dark:text-white focus:ring-1 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all placeholder-navy-400 dark:placeholder-navy-700 rounded-2xl" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Email</label>
                        <input type="email" id="email" required className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-4 text-navy-900 dark:text-white focus:ring-1 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all placeholder-navy-400 dark:placeholder-navy-700 rounded-2xl" placeholder="john@company.com" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Message</label>
                    <textarea id="message" rows={4} required className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-4 text-navy-900 dark:text-white focus:ring-1 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all resize-none placeholder-navy-400 dark:placeholder-navy-700 rounded-2xl" placeholder="Tell me about your project..."></textarea>
                </div>
                <button 
                    type="submit" 
                    disabled={formState !== 'idle'}
                    className={`w-full flex items-center justify-center gap-2 py-4 font-bold uppercase tracking-wider text-sm transition-all border rounded-full ${
                        formState === 'success' 
                        ? 'bg-green-600 border-green-600 text-white' 
                        : 'bg-gold-500 border-gold-500 text-navy-900 hover:bg-gold-400 hover:border-gold-400'
                    }`}
                >
                    {formState === 'submitting' ? (
                        "Sending..."
                    ) : formState === 'success' ? (
                        <>Sent Successfully <CheckCircle className="w-5 h-5" /></>
                    ) : (
                        <>Send Message <Send className="w-4 h-4" /></>
                    )}
                </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;