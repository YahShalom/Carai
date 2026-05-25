export type DemoApp = {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: string;
  thumbnail: string;
  embedUrl?: string;
  externalUrl: string;
  features: string[];
  techStack: string[];
  aiCapabilities: string[];
};

export const demoApps: DemoApp[] = [
  {
    id: 'fashion-stylist',
    slug: 'fashion-stylist',
    title: 'Fashion Stylist',
    description: 'A luxury styling assistant for fashion houses and high-end retail experiences.',
    longDescription: 'Fashion Stylist blends personal taste signals, runway intelligence, and trend forecasting to deliver curated outfit strategies for elevated brand storytelling.',
    category: 'Fashion AI',
    tags: ['styling', 'trend', 'brand', 'inspiration'],
    featured: true,
    status: 'Live',
    thumbnail: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    embedUrl: 'https://www.youtube.com/embed/7QUtEmBT_-w',
    externalUrl: 'https://atelier-ai.example/demo/fashion-stylist',
    features: [
      'Personalized capsule wardrobes',
      'Luxury trend forecasting with visual guidance',
      'Multimodal styling prompts and brand tone controls',
      'Seamless runway-ready moodboard generation',
    ],
    techStack: ['Next.js', 'TailwindCSS', 'GPT-4o', 'Vision APIs', 'Vector search'],
    aiCapabilities: [
      'Context-aware outfit recommendations',
      'Fabric and silhouette suggestions',
      'AI-powered editorial direction',
      'Luxury sentiment matching',
    ],
  },
  {
    id: 'barber-vision',
    slug: 'barber-vision',
    title: 'Barber Vision',
    description: 'A visual intelligence platform for premium grooming and haircut consultations.',
    longDescription: 'Barber Vision uses computer vision and personalized prompts to deliver tailored grooming recommendations, style visualizations, and an elevated customer journey for premium salons.',
    category: 'Beauty Tech',
    tags: ['grooming', 'vision', 'salon', 'consultation'],
    featured: true,
    status: 'Beta',
    thumbnail: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
    embedUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
    externalUrl: 'https://atelier-ai.example/demo/barber-vision',
    features: [
      'Live hairstyle preview in real time',
      'AI-assisted grooming routines',
      'Salon workflow optimization',
      'Visual style templates for luxury clients',
    ],
    techStack: ['Next.js', 'Framer Motion', 'Vision API', 'TypeScript', 'Svelte'],
    aiCapabilities: [
      'Image-driven style suggestions',
      'Precision cut guidance',
      'Personalized barber scripts',
      'Client mood mapping for premium service',
    ],
  },
  {
    id: 'atelier-concierge',
    slug: 'atelier-concierge',
    title: 'Atelier Concierge',
    description: 'A refined AI concierge platform for luxury hospitality and executive service.',
    longDescription: 'Atelier Concierge orchestrates premium guest journeys with intelligent recommendations, responsive service prompts, and a cinematic interface crafted for high-touch brands.',
    category: 'Concierge AI',
    tags: ['hospitality', 'service', 'executive', 'automation'],
    featured: true,
    status: 'Preview',
    thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    embedUrl: 'https://www.youtube.com/embed/Fi0Yux8cH1s',
    externalUrl: 'https://atelier-ai.example/demo/atelier-concierge',
    features: [
      'Custom itinerary creation for discerning travelers',
      'Contextual guest communication workflows',
      'Intelligent booking and reservation management',
      'White-glove service orchestration with AI memory',
    ],
    techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'AI orchestration', 'Redis'],
    aiCapabilities: [
      'Premium preference modeling',
      'Adaptive conversation personalization',
      'Multi-channel service handoffs',
      'Luxury request anticipation',
    ],
  },
];
