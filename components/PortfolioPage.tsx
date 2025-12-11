import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PROJECTS_DATA, SKILLS_DATA } from '../constants';
import { Project } from '../types';
import { generateProjectDescription } from '../services/geminiService';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import { 
  Github, 
  ExternalLink,
  Atom, 
  FileCode, 
  Sparkles, 
  Database, 
  Palette, 
  Code, 
  Globe, 
  Server,
  ArrowRight,
  ChevronDown,
  Filter,
  Tag,
  X,
  Check,
  ArrowLeft,
  Briefcase
} from 'lucide-react';

// TechBadge Logic
const TechBadge: React.FC<{ tech: string }> = ({ tech }) => {
  const t = tech.toLowerCase();
  let Icon = Code;
  
  if (t.includes('react') || t.includes('next')) Icon = Atom;
  else if (t.includes('typescript') || t.includes('node')) Icon = FileCode;
  else if (t.includes('ai') || t.includes('gemini') || t.includes('gpt')) Icon = Sparkles;
  else if (t.includes('data') || t.includes('sql') || t.includes('supabase')) Icon = Database;
  else if (t.includes('tailwind') || t.includes('css')) Icon = Palette;
  else if (t.includes('web') || t.includes('api')) Icon = Globe;
  else if (t.includes('server')) Icon = Server;

  return (
    <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy-700 dark:text-silver-300 bg-silver-100 dark:bg-navy-900 px-4 py-2 border border-gold-400/20 dark:border-gold-400/20 rounded-full transition-all duration-300 hover:scale-105 hover:bg-white dark:hover:bg-navy-800 hover:shadow-md hover:border-gold-400 cursor-default group">
      <Icon className="w-4 h-4 text-navy-500 dark:text-gold-500 group-hover:text-gold-500 transition-colors" /> 
      {tech}
    </span>
  );
};

const PortfolioPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [filter, setFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isGenerating, setIsGenerating] = useState<Record<string, boolean>>({});
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'landing', label: 'One-Page Landing Pages' },
    { key: 'multi', label: 'Multi-Page Websites' },
    { key: 'ai_web', label: 'Websites with AI Assistants' },
    { key: 'backend', label: 'Websites with Partial or Full Backend' },
    { key: 'automation', label: 'AI Automation Systems' },
    { key: 'support', label: 'Customer Support / Existing Project' }
  ];

  useEffect(() => {
    const enhanceDescriptions = async () => {
      const projectsToUpdate = projects.filter(p => !p.description || p.description.length < 10);
      if (projectsToUpdate.length === 0) return;

      for (const project of projectsToUpdate) {
        setIsGenerating(prev => ({ ...prev, [project.id]: true }));
        const newDesc = await generateProjectDescription(project.title, project.techStack);
        setProjects(prev => prev.map(p => 
          p.id === project.id ? { ...p, description: newDesc } : p
        ));
        setIsGenerating(prev => ({ ...prev, [project.id]: false }));
      }
    };
    enhanceDescriptions();
  }, []);

  const allowedCategories = ['landing','multi','ai_web','backend','automation','support'];
  const filteredProjects = useMemo(() => {
    if (filter === 'all') {
      // 'All' shows all projects that are service-related (exclude graphic design/artwork)
      return projects.filter(p => p.serviceCategory && allowedCategories.includes(p.serviceCategory));
    }
    return projects.filter(p => p.serviceCategory === filter);
  }, [filter, projects]);

  const handleFilterSelect = (newFilter: string) => {
    if (newFilter === filter) return;
    setFilter(newFilter);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 relative">
       <SEO 
        title="Portfolio & Skills | Carai Agency"
        description="Explore our featured AI-driven projects and technical expertise in web development, automation, and generative AI."
        url="https://carai.agency/portfolio"
                breadcrumbs={[
                    { name: 'Home', url: 'https://carai.agency' },
                    { name: 'Portfolio', url: 'https://carai.agency/portfolio' }
                ]}
      />
       {/* Hero Section */}
       <div 
        className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden parallax-bg mb-20"
        style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-navy-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 relative z-10">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-silver-300 hover:text-white mb-6 transition-colors font-medium group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Return Home
                </Link>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white shadow-black drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    Portfolio & Skills
                </h1>
                <p className="mt-4 text-xl text-silver-300 max-w-2xl font-light">
                    A showcase of AI-driven applications and the technical arsenal behind them.
                </p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PROJECTS SECTION */}
        <div className="mb-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 dark:text-white mb-2">Featured Projects</h2>
                    <p className="text-navy-600 dark:text-silver-400">Selected works showcasing innovation and scale.</p>
                </div>
                
                 {/* Filter Dropdown */}
                 <div className="relative z-20" ref={filterRef}>
                    <div className="flex items-center gap-3">
                    <span className="text-sm font-bold uppercase tracking-wider text-navy-400 dark:text-silver-500">Filter:</span>
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-navy-800 text-navy-900 dark:text-white border-2 border-gold-400/30 rounded-full hover:border-gold-400 transition-colors shadow-sm min-w-[180px] justify-between group"
                    >
                        <span className="font-bold flex items-center gap-2">
                        {filter === 'all' ? <Filter className="w-4 h-4 text-gold-500" /> : <Sparkles className="w-4 h-4 text-gold-500" />}
                        {FILTERS.find(f => f.key === filter)?.label || 'All'}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180 text-gold-500' : 'text-navy-400'}`} />
                    </button>
                    </div>

                    {isFilterOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-navy-800 border-2 border-gold-400/30 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                        <div className="p-2">
                        {FILTERS.map((f, idx) => (
                            <button
                                key={f.key}
                                onClick={() => handleFilterSelect(f.key)}
                                className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-between ${
                                    filter === f.key 
                                    ? 'bg-gold-500/10 text-gold-600 dark:text-gold-400' 
                                    : 'text-navy-600 dark:text-silver-400 hover:bg-silver-100 dark:hover:bg-navy-700 hover:text-navy-900 dark:hover:text-white'
                                }`}
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                {f.label}
                                {filter === f.key && <div className="w-2 h-2 rounded-full bg-gold-500"></div>}
                            </button>
                        ))}
                        </div>
                    </div>
                    )}
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 gap-12" key={filter}>
            {filteredProjects.map((project, idx) => (
                <div 
                key={project.id} 
                onClick={() => { window.location.hash = `#/project/${project.slug || project.id}` }}
                className="group relative bg-white dark:bg-navy-800 border-2 border-gold-400/10 dark:border-gold-400/10 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-[0_10px_40px_rgba(212,175,55,0.2)] flex flex-col md:flex-row h-auto md:min-h-[350px] animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-backwards hover:-translate-y-2 hover:border-gold-400"
                style={{ animationDelay: `${idx * 150}ms` }}
                >
                <div className="w-full md:w-[45%] lg:w-[40%] relative h-64 md:h-auto border-b-2 md:border-b-0 md:border-r-2 border-gold-400/10 overflow-hidden">
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                        style={{ backgroundImage: `url(${project.imageUrl})` }}
                    >
                        <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/20 transition-colors duration-500"></div>
                    </div>
                    <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 z-10">
                        <span className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm drop-shadow-md bg-gold-500/90 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg">
                            View Details <ArrowRight className="w-4 h-4" />
                        </span>
                    </div>
                </div>
                
                <div className="w-full md:w-[55%] lg:w-[60%] p-8 md:p-10 flex flex-col justify-center relative z-10 bg-white dark:bg-navy-800 transition-colors duration-300">
                    <div className="mb-4">
                    <h3 className="text-3xl font-bold text-navy-900 dark:text-white group-hover:text-gold-500 transition-colors duration-300 font-display mb-3">
                        {project.title}
                    </h3>
                    {project.tags && (
                        <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-1 rounded-full border border-gold-500/20 hover:bg-gold-500/20 transition-colors">
                            <Tag className="w-3 h-3" /> {tag}
                            </span>
                        ))}
                        </div>
                    )}
                    </div>
                    
                    <div className="mb-8 min-h-[4rem]">
                    {isGenerating[project.id] ? (
                        <div className="flex items-center gap-2 text-gold-500 animate-pulse">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-bold uppercase tracking-wider">Generating AI Description...</span>
                        </div>
                    ) : (
                        <p className="text-navy-600 dark:text-silver-400 leading-relaxed font-light text-lg line-clamp-3">
                        {project.description}
                        </p>
                    )}
                    </div>

                    <div className="flex flex-wrap gap-3 mt-auto mb-6">
                    {project.techStack.map((tech) => (
                        <TechBadge key={tech} tech={tech} />
                    ))}
                    </div>

                    {/* Open Case Study Link */}
                    <a href={`#/project/${project.slug || project.id}`} className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 hover:text-gold-500 dark:hover:text-gold-300 font-bold uppercase tracking-wider text-xs transition-colors border-b border-gold-400/50 pb-1 hover:border-gold-400">
                      Open Case Study <ArrowRight className="w-3 h-3" />
                    </a>
                </div>
                </div>
            ))}
            </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gold-400/20 my-20"></div>

        {/* SKILLS SECTION */}
        <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 dark:text-white mb-8">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {SKILLS_DATA.map((category, idx) => (
                <div 
                key={idx} 
                className="group bg-white dark:bg-navy-800 border-2 border-gold-400/10 p-10 hover:border-gold-400 transition-all duration-300 shadow-xl rounded-3xl"
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

      {/* Floating CTA Button */}
      <Link
        to="/contact"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-navy-900/95 dark:bg-white/95 backdrop-blur-md text-white dark:text-navy-900 rounded-full font-bold uppercase tracking-wider shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gold-400/30 group animate-in slide-in-from-bottom-20 fade-in duration-1000 delay-500"
      >
        <div className="p-2 bg-gold-500 rounded-full text-navy-900 group-hover:bg-gold-400 transition-colors">
            <Briefcase className="w-4 h-4" />
        </div>
        <span className="relative hidden md:inline">
            Check out our Services
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
        </span>
        <span className="md:hidden">Services</span>
      </Link>

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in" onClick={() => setSelectedProject(null)}></div>
            <div className="relative w-full max-w-6xl bg-white dark:bg-navy-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border-2 border-gold-400/30" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-50 p-2 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-colors border border-white/20">
                    <X className="w-6 h-6" />
                </button>
                <div className="lg:w-[45%] relative h-64 lg:h-auto bg-navy-900">
                    <img loading="lazy" src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover opacity-90"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-navy-900/90 to-transparent">
                         <div className="flex flex-wrap gap-2 mb-4">
                            {selectedProject.tags?.map(tag => (
                                <span key={tag} className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/20 px-2 py-1 rounded-full backdrop-blur-md border border-gold-500/30">
                                <Tag className="w-3 h-3" /> {tag}
                                </span>
                            ))}
                        </div>
                        <h2 className="text-4xl font-display font-bold text-white mb-2 shadow-black drop-shadow-md">
                            {selectedProject.title}
                        </h2>
                    </div>
                </div>
                <div className="lg:w-[55%] p-8 lg:p-12 overflow-y-auto custom-scrollbar bg-white dark:bg-navy-800">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-navy-400 dark:text-silver-500 mb-4">Description</h3>
                            <p className="text-navy-700 dark:text-silver-300 text-lg leading-relaxed font-light">{selectedProject.description}</p>
                        </div>
                        {selectedProject.features && (
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-navy-400 dark:text-silver-500 mb-4">Key Features</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {selectedProject.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3 text-navy-600 dark:text-silver-400">
                                            <div className="mt-1 p-0.5 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex-shrink-0"><Check className="w-3.5 h-3.5" /></div>
                                            <span className="leading-snug text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-navy-400 dark:text-silver-500 mb-4">Technology Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.techStack.map((tech) => (<TechBadge key={tech} tech={tech} />))}
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4 border-t border-gold-400/20">
                            {selectedProject && selectedProject.slug === 'perry-d-beauty-studio' ? (
                                <a href={`https://www.perrydbeauty.store/#/`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-4 bg-gold-500 text-navy-900 font-bold uppercase tracking-wider text-sm hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20 rounded-full">
                                    <ExternalLink className="w-4 h-4" /> View Website
                                </a>
                            ) : (
                                selectedProject.demoUrl && (
                                  <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-4 bg-gold-500 text-navy-900 font-bold uppercase tracking-wider text-sm hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20 rounded-full">
                                      <ExternalLink className="w-4 h-4" /> Launch Demo
                                  </a>
                                )
                            )}
                            {selectedProject.repoUrl && (
                                <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-4 bg-silver-100 dark:bg-navy-700 text-navy-900 dark:text-white border-2 border-gold-400/20 font-bold uppercase tracking-wider text-sm hover:bg-white dark:hover:bg-navy-600 transition-colors rounded-full hover:border-gold-400">
                                    <Github className="w-4 h-4" /> View Source
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;