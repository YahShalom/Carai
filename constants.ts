import { Project, SkillCategory, SectionId, Artwork } from './types';
import { Github, Linkedin, Mail, Twitter, Lightbulb, Shield, Award, Users, RefreshCw, Zap, Globe } from 'lucide-react';

export { SectionId };

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Art Work', href: '/artwork' },
  { label: 'Contact', href: '/contact' },
];

export const HERO_DATA = {
  name: "Raphael Castellano",
  role: "Senior AI & Frontend Engineer",
  tagline: "Architecting the future of web experiences with Generative AI and scalable React ecosystems.",
};

export const ABOUT_DATA = "I am a Senior Frontend React Engineer with a deep specialization in Generative AI integration. I bridge the gap between cutting-edge LLMs and intuitive user interfaces. With a focus on performance, aesthetics, and usability, I build applications that don't just function—they think. My workflow involves the latest in the React ecosystem, TypeScript, and the Gemini API to create next-generation intelligent web apps.";

export const COMPANY_MISSION = "To bridge the gap between human creativity and artificial intelligence, empowering innovative brands with digital ecosystems that are not just functional, but intelligent, adaptive, and profoundly human-centric.";

export const COMPANY_VISION = "A digital landscape where AI is seamlessly integrated into every user interaction, making technology invisible, intuitive, and a catalyst for limitless potential across the Caribbean and the globe.";

export const CORE_VALUES = [
  {
    title: "Innovation",
    desc: "Constantly pushing the boundaries of what's possible with AI and Web Technologies.",
    icon: Lightbulb
  },
  {
    title: "Integrity",
    desc: "Building transparent, ethical, and secure systems that users can trust implicitly.",
    icon: Shield
  },
  {
    title: "Excellence",
    desc: "Delivering pixel-perfect, high-performance code with zero compromise on quality.",
    icon: Award
  },
  {
    title: "Collaboration",
    desc: "Believing that AI augments human potential, it serves to elevate the team, not replace it.",
    icon: Users
  },
  {
    title: "Adaptability",
    desc: "Evolving faster than the technology landscape to ensure clients stay ahead of the curve.",
    icon: RefreshCw
  },
  {
    title: "Simplicity",
    desc: "Turning complex algorithms and data structures into intuitive, effortless user experiences.",
    icon: Zap
  },
  {
    title: "Impact",
    desc: "Creating solutions that drive real-world value, growth, and positive change.",
    icon: Globe
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Frontend Core",
    skills: ["React 18+", "TypeScript", "Tailwind CSS", "Next.js", "Vite", "Redux/Zustand"]
  },
  {
    title: "AI & ML Integration",
    skills: ["Gemini API", "TensorFlow.js", "LangChain", "RAG Architectures", "Prompt Engineering", "Python"]
  },
  {
    title: "Backend & Cloud",
    skills: ["Node.js", "Supabase", "PostgreSQL", "Edge Functions", "Vercel", "Docker"]
  },
  {
    title: "Tools & Design",
    skills: ["Figma", "Git", "CI/CD", "Jest/Vitest", "UI/UX Architecture"]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "1",
    title: "NeuralCanvas",
    description: "A real-time collaborative whiteboard that uses the Gemini API to generate diagrams, code snippets, and design suggestions based on rough sketches. Users can draw shapes and have the AI interpret them into functional UI components.",
    features: [
      "Real-time multiplayer collaboration using Socket.io",
      "Gemini Multimodal input for sketch-to-code generation",
      "Infinite canvas with zoom and pan capabilities",
      "Export designs directly to React/Tailwind code"
    ],
    techStack: ["React", "Gemini 2.5 Flash", "Canvas API", "Socket.io"],
    tags: ["Frontend", "AI", "SaaS", "Generative AI"],
    imageUrl: "https://picsum.photos/800/600?random=1",
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: "2",
    title: "AgentDesk",
    description: "An autonomous AI agent dashboard capable of executing complex multi-step workflows. Features a 'Thinking' UI to visualize the model's reasoning process and allows for human-in-the-loop intervention.",
    features: [
      "Visual chain-of-thought execution logs",
      "Custom tool creation builder",
      "Persistent agent memory state",
      "Role-based access control for agent deployment"
    ],
    techStack: ["TypeScript", "Gemini 3 Pro", "Tailwind", "Node.js"],
    tags: ["Fullstack", "AI", "B2B", "Dashboard"],
    imageUrl: "https://picsum.photos/800/600?random=2",
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: "3",
    title: "VoiceCode Live",
    description: "A coding accessibility tool leveraging the Live API for real-time voice-to-code generation, enabling hands-free development with low latency. It understands programming context and allows for voice-driven refactoring.",
    features: [
      "Sub-200ms latency voice command processing",
      "Context-aware code insertion",
      "Custom voice macros for common patterns",
      "Live syntax highlighting and error checking"
    ],
    techStack: ["React", "Gemini Live API", "Web Audio API", "Vite"],
    tags: ["Frontend", "AI", "Accessibility", "Real-time"],
    imageUrl: "https://picsum.photos/800/600?random=3",
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: "4",
    title: "Semantic Search Engine",
    description: "A vector-based search engine for technical documentation, using embeddings to understand query intent rather than just keyword matching. Includes a chat interface for follow-up questions on the retrieved docs.",
    features: [
      "Hybrid search (Keyword + Vector) for max accuracy",
      "RAG pipeline with citation tracking",
      "Automatic documentation indexing pipeline",
      "Dark/Light mode support for reading views"
    ],
    techStack: ["Next.js", "Supabase pgvector", "Gemini Embeddings"],
    tags: ["Fullstack", "AI", "RAG", "Search"],
    imageUrl: "https://picsum.photos/800/600?random=4",
    demoUrl: "#",
    repoUrl: "#"
  }
];

export const ARTWORK_DATA: Artwork[] = [
  {
    id: '1',
    title: 'Neon Horizon',
    category: 'Logos',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799314348d?q=80&w=2670&auto=format&fit=crop',
    description: 'A modern, minimalistic logo designed for a cyber-security startup, embodying protection and digital frontiers.'
  },
  {
    id: '2',
    title: 'Summit Tech Conference',
    category: 'Flyers/Banners',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2664&auto=format&fit=crop',
    description: 'Promotional banner for an annual technology summit, focusing on clean lines and impactful typography.'
  },
  {
    id: '3',
    title: 'Smart Living Campaign',
    category: 'Ads',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-109155714d9d?q=80&w=2670&auto=format&fit=crop',
    description: 'A series of high-conversion social media ads for a new line of IoT home devices.'
  },
  {
    id: '4',
    title: 'Zenith Brew',
    category: 'Product Labels',
    imageUrl: 'https://images.unsplash.com/photo-1613254025696-6548d947264e?q=80&w=2574&auto=format&fit=crop',
    description: 'Premium coffee packaging design that combines rustic textures with modern gold foiling.'
  },
  {
    id: '5',
    title: 'Metro Wayfinding',
    category: 'Signs',
    imageUrl: 'https://images.unsplash.com/photo-1565514020176-6c2235c8715c?q=80&w=2670&auto=format&fit=crop',
    description: 'Clear, accessible interior signage system for a metropolitan transit hub.'
  },
  {
    id: '6',
    title: 'Vortex Identity',
    category: 'Logos',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    description: 'Abstract logo mark for a data analytics firm, representing flow and convergence.'
  },
  {
    id: '7',
    title: 'Pure Press Juice',
    category: 'Product Labels',
    imageUrl: 'https://images.unsplash.com/photo-1630400032970-e54737d9283c?q=80&w=2670&auto=format&fit=crop',
    description: 'Vibrant, fresh packaging for a line of organic cold-pressed juices.'
  },
  {
    id: '8',
    title: 'Summer Festival',
    category: 'Flyers/Banners',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop',
    description: 'Event flyer designed to capture the energy and warmth of a summer music festival.'
  },
  {
    id: '9',
    title: 'Urban Retail Signage',
    category: 'Signs',
    imageUrl: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2680&auto=format&fit=crop',
    description: 'Exterior storefront signage that blends neon aesthetics with industrial materials.'
  }
];

export const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:raphael@example.com", label: "Email" },
];

export const AI_SYSTEM_INSTRUCTION = `
You are the AI assistant for Raphael Castellano's portfolio.
Your name is "Raphael's Bot".
You speak in a professional, slightly technical, but friendly and enthusiastic tone.
You have access to the following information about Raphael:
- He is a Senior Frontend & AI Engineer.
- He specializes in React, TypeScript, and Gemini API.
- He builds production-ready AI apps.
- His projects include NeuralCanvas, AgentDesk, VoiceCode Live, and a Semantic Search Engine.
- He also offers creative design services including Logos, Ads, and Branding.
- He offers productized web services: One-Page Landers, Multi-Page Sites, AI-Augmented Sites, Full-Stack Apps, and Automation Systems.
- He is passionate about Clean Code and UX.
- Company Mission: ${COMPANY_MISSION}
- Company Vision: ${COMPANY_VISION}
- Core Values: Innovation, Integrity, Excellence, Collaboration, Adaptability, Simplicity, Impact.

Your goal is to answer visitor questions about Raphael's skills, experience, projects, services, and company values.
If asked for contact info, direct them to the contact section or mention his email (raphael@example.com).
Keep answers concise (under 3 sentences usually) unless asked for details.
Do not hallucinate projects not listed here.
`;