export interface Project {
  id: string;
  slug: string;
  title: string;
  client?: string;
  date?: string;
  role?: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  heroImage?: string;
  gallery?: string[];
  demoUrl?: string;
  repoUrl?: string;
  features?: string[];
  tags?: string[];
  serviceCategory?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  testimonial?: {
    text: string;
    author?: string;
    resultHint?: string;
  };
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export type ArtworkCategory = 'All' | 'Ads' | 'Logos' | 'Signs' | 'Product Labels' | 'Flyers/Banners';

export interface Artwork {
  id: string;
  title: string;
  category: ArtworkCategory;
  imageUrl: string;
  description?: string;
}

export enum SectionId {
  HOME = 'home',
  ABOUT = 'about',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  CONTACT = 'contact',
  ARTWORK = 'artwork'
}