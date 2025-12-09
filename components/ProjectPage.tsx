import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../constants';
import { 
  ExternalLink, 
  Github, 
  Layers, 
  Atom, 
  FileCode, 
  Sparkles, 
  Database, 
  Palette, 
  Code, 
  Globe, 
  Server,
  ArrowLeft,
  Check
} from 'lucide-react';

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
    <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy-700 dark:text-silver-300 bg-silver-50 dark:bg-navy-800 px-4 py-2 border border-gold-400/20 rounded-full shadow-sm hover:border-gold-400 transition-colors">
      <Icon className="w-4 h-4 text-gold-500" /> 
      {tech}
    </span>
  );
};

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS_DATA.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-display font-bold text-navy-900 dark:text-white mb-4">Project Not Found</h2>
        <Link to="/" className="text-gold-500 hover:text-gold-400 font-bold flex items-center gap-2">
           <ArrowLeft className="w-4 h-4" /> Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header Image with Parallax */}
      <div 
        className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden parallax-bg"
        style={{
            backgroundImage: `url(${project.imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-silver-300 hover:text-white mb-6 transition-colors font-medium">
                    <ArrowLeft className="w-5 h-5" /> Back to Projects
                </Link>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2 shadow-black drop-shadow-lg">
                    {project.title}
                </h1>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
                <div className="bg-white dark:bg-navy-800 p-8 rounded-3xl border border-gold-400/20 shadow-sm">
                    <h2 className="text-2xl font-display font-bold text-navy-900 dark:text-white mb-6">About the Project</h2>
                    <p className="text-navy-600 dark:text-silver-300 text-lg leading-relaxed font-light">
                        {project.description}
                    </p>
                </div>

                {project.features && (
                    <div className="bg-white dark:bg-navy-800 p-8 rounded-3xl border border-gold-400/20 shadow-sm">
                        <h2 className="text-2xl font-display font-bold text-navy-900 dark:text-white mb-6">Key Features</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {project.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 text-navy-600 dark:text-silver-400">
                                    <div className="mt-1 p-0.5 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex-shrink-0">
                                        <Check className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="leading-snug">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
                <div className="bg-white dark:bg-navy-800 p-8 rounded-3xl border border-gold-400/20 shadow-sm">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-navy-400 dark:text-silver-500 mb-6">Technology Stack</h3>
                    <div className="flex flex-wrap gap-3">
                        {project.techStack.map((tech) => (
                            <TechBadge key={tech} tech={tech} />
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-navy-800 p-8 rounded-3xl border border-gold-400/20 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-navy-400 dark:text-silver-500 mb-2">Project Links</h3>
                    {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-gold-500 text-navy-900 font-bold uppercase tracking-wider text-sm hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20 rounded-full">
                            <ExternalLink className="w-4 h-4" /> Launch Demo
                        </a>
                    )}
                    {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-navy-100 dark:bg-navy-900 text-navy-900 dark:text-white border-2 border-gold-400/10 font-bold uppercase tracking-wider text-sm hover:bg-white dark:hover:bg-navy-700 transition-colors rounded-full hover:border-gold-400">
                            <Github className="w-4 h-4" /> View Source
                        </a>
                    )}
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};

export default ProjectPage;