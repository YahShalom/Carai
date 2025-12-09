export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  features?: string[];
  tags?: string[];
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