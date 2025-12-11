import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PROJECTS_DATA, SectionId } from '../constants';
import { Project } from '../types';
import { generateProjectDescription } from '../services/geminiService';
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
  
  
  Loader2
} from 'lucide-react';

// Enhanced TechBadge Styling
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

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [filter, setFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState<Record<string, boolean>>({});
  const filterRef = useRef<HTMLDivElement>(null);

  const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'landing', label: 'One-Page Landing Pages' },
    { key: 'multi', label: 'Multi-Page Websites' },
    { key: 'ai_web', label: 'Websites with AI Assistants' },
    { key: 'backend', label: 'Websites with Partial or Full Backend' },
    { key: 'automation', label: 'AI Automation Systems' },
    { key: 'support', label: 'Customer Support / Existing Project' }
  ];

  // AI Description Generator Logic
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
  }, []); // Run once on mount

  const allowedCategories = ['landing','multi','ai_web','backend','automation','support'];
  const filteredProjects = useMemo(() => {
    if (filter === 'all') {
      return projects.filter(p => p.serviceCategory && allowedCategories.includes(p.serviceCategory));
    }
    return projects.filter(p => p.serviceCategory === filter);
  }, [filter, projects]);

  const handleFilterSelect = (newFilter: string) => {
    if (newFilter === filter) return;
    setFilter(newFilter);
    setIsFilterOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // (No modal in this component; navigation goes to the project detail page)

  return (
    <section id={SectionId.PROJECTS} className="py-32 bg-silver-50 dark:bg-navy-900 border-t border-gold-400/20 transition-colors duration-300 relative">
      
      {/* Dimmed Overlay for Focus */}
      {isFilterOpen && (
        <div 
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-[2px] z-30 transition-all duration-300 animate-in fade-in"
            onClick={() => setIsFilterOpen(false)}
            aria-hidden="true"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 reveal">
            <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 dark:text-white mb-4">Featured Projects</h2>
                <p className="text-navy-600 dark:text-silver-400 max-w-xl text-lg font-light">
                    Selected works showcasing AI integration, complex state management, and modern UI patterns.
                </p>
            </div>
            
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gold-600 dark:text-gold-400 hover:text-gold-500 dark:hover:text-gold-300 flex items-center gap-2 font-bold uppercase tracking-wider text-sm transition-colors border-b border-gold-400/50 pb-1 hover:border-gold-400">
                View GitHub <Github className="w-4 h-4" />
            </a>
        </div>

        {/* Filter Dropdown */}
        <div className="mb-12 relative z-40 reveal" ref={filterRef}>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-wider text-navy-400 dark:text-silver-500">Filter By:</span>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-navy-800 text-navy-900 dark:text-white border-2 border-gold-400/30 rounded-full hover:border-gold-400 transition-colors shadow-sm min-w-[180px] justify-between group relative z-50"
              >
                  <span className="font-bold flex items-center gap-2">
                   {filter === 'all' ? <Filter className="w-4 h-4 text-gold-500" /> : <Sparkles className="w-4 h-4 text-gold-500" />}
                   {FILTERS.find(f => f.key === filter)?.label || 'All'}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180 text-gold-500' : 'text-navy-400'}`} />
              </button>
            </div>

            {/* Dropdown Menu */}
            {isFilterOpen && (
              <div className="absolute top-full left-[100px] mt-2 w-56 bg-white dark:bg-navy-800 border-2 border-gold-400/30 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
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

        {/* Projects Grid with Animation Key for Staggering */}
        <div 
          className="grid grid-cols-1 gap-12 min-h-[500px]"
          key={filter} 
        >
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              onClick={() => { window.location.hash = `#/project/${project.slug || project.id}` }}
              className="group relative bg-white dark:bg-navy-800 border-2 border-gold-400/10 dark:border-gold-400/10 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-[0_10px_40px_rgba(212,175,55,0.2)] flex flex-col md:flex-row h-auto md:min-h-[350px] animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-backwards hover:-translate-y-2 hover:border-gold-400"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* Image Section - Left on desktop (md) with Parallax-like Background */}
              <div className="w-full md:w-[45%] lg:w-[40%] relative h-64 md:h-auto border-b-2 md:border-b-0 md:border-r-2 border-gold-400/10 overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                    style={{ 
                        backgroundImage: `url(${project.imageUrl})`,
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Parallax / Depth Overlay Effect */}
                    <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/20 transition-colors duration-500"></div>
                </div>
                
                {/* View Details Overlay */}
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 z-10">
                    <span className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm drop-shadow-md bg-gold-500/90 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg">
                        View Details <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
              </div>
              
              {/* Content Section - Right on desktop (md) */}
              <div className="w-full md:w-[55%] lg:w-[60%] p-8 md:p-10 flex flex-col justify-center relative z-10 bg-white dark:bg-navy-800 transition-colors duration-300">
                <div className="mb-4">
                  <h3 className="text-3xl font-bold text-navy-900 dark:text-white group-hover:text-gold-500 transition-colors duration-300 font-display mb-3">
                    {project.title}
                  </h3>
                  
                  {/* Tags Display */}
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

                {/* Tech Stack Icons */}
                <div className="flex flex-wrap gap-3 mt-auto mb-6">
                  {project.techStack.map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </div>

                {/* Open Case Study Link */}
                <a href={`#/project/${project.slug || project.id}`} className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 hover:text-gold-500 dark:hover:text-gold-300 font-bold uppercase tracking-wider text-xs transition-colors border-b border-gold-400/50 pb-1 hover:border-gold-400">
                  Open Case Study <ArrowRight className="w-3 h-3" />
                </a>

                {/* Background decorative shine on hover */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-gold-400/10 to-transparent rounded-bl-full transform translate-x-24 -translate-y-24 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-700 pointer-events-none"></div>
              </div>

              {/* Enhanced Glow Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-500/50 rounded-3xl transition-colors duration-500 pointer-events-none z-20"></div>
            </div>
          ))}
          
          {filteredProjects.length === 0 && (
              <div className="text-center py-20 animate-in fade-in duration-500 bg-white/50 dark:bg-navy-800/50 border-2 border-dashed border-gold-400/30 rounded-3xl">
                  <div className="inline-flex items-center justify-center p-4 bg-silver-100 dark:bg-navy-900 rounded-full mb-4">
                     <Filter className="w-8 h-8 text-navy-300 dark:text-silver-600" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">No projects found</h3>
                  <p className="text-navy-500 dark:text-silver-500 text-lg mb-6">There are no projects matching the "{filter}" filter.</p>
                  <button 
                    onClick={() => setFilter('All')} 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-navy-900 font-bold uppercase tracking-wider text-sm hover:bg-gold-400 transition-colors rounded-full shadow-lg shadow-gold-500/20"
                  >
                    Clear Filter
                  </button>
              </div>
          )}
        </div>
      </div>

        {/* No modal — clicking a project navigates to the project detail (slug) */}
    </section>
  );
};

export default Projects;