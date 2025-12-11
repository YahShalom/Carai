import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import { 
  ArrowLeft, 
  Check, 
  ArrowRight, 
  Monitor, 
  Layers, 
  Cpu, 
  Database, 
  GitBranch, 
  Zap,
    Palette,
  Star,
  Quote,
  TrendingUp,
  Shield,
  Globe
} from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 'one-page',
    title: 'One-Page Landing Pages',
    icon: Monitor,
    description: 'For a single offer, event, or brand. Fast, focused, and conversion-oriented.',
    idealFor: 'Beauty studios, barbers, small brands, creators, single products.',
    includes: [
      'Hero section, Benefits, Social Proof',
      'FAQ Accordion',
      'Contact/WhatsApp section',
      'Fast SEO-friendly structure',
      'High-conversion design',
      'Mobile Responsive Layout',
      'Google Analytics Setup',
      'Speed Optimization (90+ Score)',
      'Custom Domain Connection',
      'Social Media Preview Cards',
      'A/B Testing Ready Architecture'
    ],
    tech: 'Vite/React or Next.js static',
    range: 'Entry Level',
    color: 'from-blue-500 to-cyan-400',
    shadow: 'shadow-blue-500/20 hover:shadow-blue-500/40'
  },
  {
    id: 'multi-page',
    title: 'Multi-Page Landing Sites',
    icon: Layers,
    description: 'For brands that need a small site with 2–5 pages. Establishes authority and trust.',
    idealFor: 'Salons, clinics, personal brands, small businesses.',
    includes: [
      'Home, About, Services, Contact pages',
      'Gallery/Portfolio Section',
      'Shared Layout & Routing',
      'Responsive Architecture',
      'Basic SEO Setup',
      'CMS Integration (Content)',
      'Newsletter Signup Form',
      'Custom 404 & Error Pages',
      'Dynamic XML Sitemap',
      'Interactive Maps Integration',
      'GDPR/Cookie Consent Banner'
    ],
    tech: 'Next.js (App Router)',
    range: 'Mid-Range',
    color: 'from-purple-500 to-pink-400',
    shadow: 'shadow-purple-500/20 hover:shadow-purple-500/40'
  },
  {
    id: 'ai-augmented',
    title: 'Websites with AI Assistants',
    icon: Cpu,
    description: 'Websites that include a custom AI assistant or chatbot to handle inquiries 24/7.',
    idealFor: 'Service businesses that get lots of questions.',
    includes: [
      'Custom Trained AI Chatbot',
      'Trained on Services & FAQs',
      'Lead Capture via Chat',
      'Optional Content Suggestions',
      'Smart Auto-replies',
      'Conversation History Storage',
      'Human Handoff Protocol',
      'Multilingual Support',
      'Sentiment Analysis Reporting',
      'Custom Tone & Personality Design',
      'Slack/Email Admin Notifications'
    ],
    tech: 'Next.js + AI API (Gemini/OpenAI)',
    range: 'Premium',
    color: 'from-amber-500 to-orange-400',
    shadow: 'shadow-amber-500/20 hover:shadow-amber-500/40'
  },
  {
    id: 'backend',
    title: 'Websites with Partial or Full Backend',
    icon: Database,
    description: 'For businesses that need accounts, dashboards, or data storage. Scalable and secure.',
    idealFor: 'Agencies, internal tools, small SaaS.',
    includes: [
      'User Accounts & Authentication',
      'Admin Dashboards',
      'Forms & Lead Database',
      'Role-Based Access Control',
      'Complex Data Flows',
      'API Documentation',
      'Automated Backups',
      'Data Encryption at Rest',
      'Real-time Database Subscriptions',
      'File Storage & Optimization',
      'Audit Logs & Security Tracing'
    ],
    tech: 'Next.js + Supabase DB/Auth',
    range: 'Custom Quote',
    color: 'from-emerald-500 to-teal-400',
    shadow: 'shadow-emerald-500/20 hover:shadow-emerald-500/40'
  },
  {
    id: 'automation',
    title: 'AI Automation Systems',
    icon: GitBranch,
    description: 'Standalone or attached workflows to stop doing repetitive tasks manually.',
    idealFor: 'People who want efficiency and automation.',
    includes: [
      'DM to Sheet/DB Logging',
      'Form to Email/WhatsApp Alerts',
      'Simple CRM Flows',
      'Content Drafting Helpers',
      'Workflow Optimization',
      'Error Handling & Retries',
      'Activity Logging Dashboard',
      'Scheduled Triggers',
      'Webhook Integrations',
      'PDF Generation Pipelines',
      'Cost-Usage Monitoring Dashboard'
    ],
    tech: 'Next.js front + Supabase + n8n/Zapier',
    range: 'Project-Based',
    color: 'from-red-500 to-rose-400',
    shadow: 'shadow-red-500/20 hover:shadow-red-500/40'
  }
    ,
    {
        id: 'graphic-designs',
        title: 'Graphic Designs & Branding',
        icon: Palette,
        description: 'Visual identity, ad creatives, and print-ready assets for brands of all sizes.',
        idealFor: 'Brands that need logos or rebrands, social media content packs, product labels & packaging, signs, flyers, brochures, and posters.',
        includes: [
            'Brand identity kits (logo, colors, typography)',
            'Social media post & story templates',
            'Ad creatives for Meta / Google / TikTok',
            'Product labels and bottle/packaging layouts',
            'Business cards, letterheads, and stationery',
            'Print-ready export (CMYK, bleed, trim)',
            'Two revision rounds per project (configurable)'
        ],
        tech: 'Design + Figma / Affinity / Print-ready exports',
        range: 'Project-Based',
        color: 'from-pink-500 to-fuchsia-400',
        shadow: 'shadow-pink-500/20 hover:shadow-pink-500/40'
    }
];

const TESTIMONIALS = [
    {
        name: "Sarah Jenkins",
        role: "Founder, Glow Beauty",
        text: "The one-page site Raphael built doubled our booking rate in a week. Clean, fast, and exactly what we needed to launch our new summer collection.",
        rating: 5
    },
    {
        name: "Marcus Thorne",
        role: "CEO, Thorne Realty",
        text: "Our multi-page platform handles thousands of visitors. The AI chatbot he integrated saves my support team 20 hours a week by qualifying leads automatically.",
        rating: 5
    },
    {
        name: "Elena Rodriguez",
        role: "Marketing Director, Nexus",
        text: "Automating our lead flow with custom workflows changed everything. No more manual data entry errors. Highly recommend the automation package.",
        rating: 5
    }
];

const TRUSTED_BY = [
  { name: "TechFlow", icon: TrendingUp },
  { name: "SecureNet", icon: Shield },
  { name: "GlobalReach", icon: Globe },
  { name: "Innovate Labs", icon: Zap },
  { name: "FutureScale", icon: Layers }
];

const ServicesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
            <SEO 
                title="Services | Carai Agency" 
                description="Explore our AI-powered web services: landing pages, automation systems, and full-stack applications."
                url="https://carai.agency/services"
                breadcrumbs={[
                    { name: 'Home', url: 'https://carai.agency' },
                    { name: 'Services', url: 'https://carai.agency/services' }
                ]}
            />
      {/* Header Image */}
      <div 
        className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden parallax-bg mb-20"
        style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-navy-950/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
        
        {/* Animated Tech Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 relative z-10">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-silver-300 hover:text-white mb-6 transition-colors font-medium group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Return Home
                </Link>
                <div className="flex items-center gap-3 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <Zap className="w-6 h-6 text-gold-400 fill-current" />
                    <span className="text-gold-500 font-bold tracking-widest uppercase text-sm">Solutions</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white shadow-black drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    Services We Offer
                </h1>
                <p className="mt-4 text-xl text-silver-300 max-w-2xl font-light">
                    Productized development packages designed to scale with your business, from launch to dominance.
                </p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro */}
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-navy-900 dark:text-white mb-6">Choose Your Growth Engine</h2>
            <p className="text-navy-600 dark:text-silver-400 max-w-3xl mx-auto text-lg leading-relaxed">
                Whether you need a lightning-fast landing page to capture leads or a full-scale AI application to run your business, 
                we have a tailored solution ready to deploy.
            </p>
            <p className="mt-4 text-sm text-navy-600 dark:text-silver-400">Also offering: <a href="/artwork" className="text-gold-500 font-bold">Graphic Designs &amp; Branding</a></p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {SERVICES_DATA.map((service, idx) => (
                <div 
                    key={service.id} 
                    className="group flex flex-col bg-white dark:bg-navy-800 border-2 border-gold-400/10 rounded-3xl overflow-hidden hover:border-gold-400/50 transition-all duration-300 relative animate-in slide-in-from-bottom-8 fade-in fill-mode-backwards hover:-translate-y-2"
                    style={{ animationDelay: `${idx * 100}ms` }}
                >
                    {/* Hover Glow Effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>

                    {/* Top Accent */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${service.color} relative z-10`}></div>
                    
                    <div className="p-8 flex-1 flex flex-col relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            {/* Distinct Icon Container with Service-Specific Shadow */}
                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg ${service.shadow} group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                <service.icon className="w-8 h-8 relative z-10" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-navy-900 dark:bg-white text-white dark:text-navy-900 px-3 py-1 rounded-full shadow-sm">
                                {service.range}
                            </span>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-navy-900 dark:text-white mb-3 group-hover:text-gold-500 transition-colors">
                            {service.title}
                        </h3>
                        <p className="text-navy-600 dark:text-silver-400 text-sm mb-6 leading-relaxed min-h-[60px]">
                            {service.description}
                        </p>

                        <div className="mb-6 p-4 bg-silver-50 dark:bg-navy-900/50 rounded-xl border border-gold-400/10">
                            <span className="text-xs font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400 block mb-2">Ideal For:</span>
                            <p className="text-sm text-navy-700 dark:text-silver-300">{service.idealFor}</p>
                        </div>

                        <div className="space-y-3 mb-8 flex-1">
                            {service.includes.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-navy-600 dark:text-silver-400 group-hover:text-navy-800 dark:group-hover:text-silver-200 transition-colors">
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-6 border-t border-gold-400/10">
                            <div className="text-xs font-mono text-navy-400 dark:text-silver-500 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gold-500"></span>
                                {service.tech}
                            </div>
                            <Link 
                                to={`/contact?service=${encodeURIComponent(service.title)}`}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-navy-900 dark:bg-white text-white dark:text-navy-900 font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-gold-500 dark:hover:bg-gold-400 hover:text-navy-900 transition-all shadow-lg"
                            >
                                Start This Project <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Trusted By Section (Logos) */}
        <div className="mb-24 text-center reveal">
           <p className="text-sm font-bold uppercase tracking-widest text-navy-400 dark:text-silver-500 mb-8">Trusted By Innovative Brands</p>
           <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
              {TRUSTED_BY.map((brand, idx) => (
                 <div key={idx} className="flex items-center gap-2 text-navy-800 dark:text-silver-400 hover:text-gold-500 dark:hover:text-gold-400 transition-colors grayscale hover:grayscale-0 cursor-default">
                    <brand.icon className="w-8 h-8" />
                    <span className="text-xl font-display font-bold">{brand.name}</span>
                 </div>
              ))}
           </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
            <div className="text-center mb-12 reveal">
                <h2 className="text-3xl font-display font-bold text-navy-900 dark:text-white mb-4">Client Success Stories</h2>
                <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((testimonial, idx) => (
                    <div 
                        key={idx} 
                        className="bg-white dark:bg-navy-800 p-8 rounded-3xl border border-gold-400/10 shadow-lg relative reveal hover:-translate-y-1 transition-transform duration-300"
                        style={{ animationDelay: `${idx * 150}ms` }}
                    >
                        <Quote className="w-10 h-10 text-gold-500/20 absolute top-6 right-6" />
                        <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-gold-500 fill-current" />
                            ))}
                        </div>
                        <p className="text-navy-700 dark:text-silver-300 mb-6 italic leading-relaxed">
                            "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-navy-900 flex items-center justify-center text-white font-bold text-sm">
                                {testimonial.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-navy-900 dark:text-white text-sm">{testimonial.name}</h4>
                                <p className="text-xs text-gold-600 dark:text-gold-400 uppercase tracking-wider">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ServicesPage;