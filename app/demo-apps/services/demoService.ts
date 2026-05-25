import { demoApps, type DemoApp as DemoAppModel } from '../data/demoApps';

export type DemoApp = DemoAppModel;

export type DemoSearchOptions = {
  query?: string;
  category?: string;
};

export type SavedWorkflow = {
  id: string;
  demoId: string;
  name: string;
  notes: string;
  createdAt: string;
  updatedAt?: string;
};

export type RecommendationMemory = {
  userId: string;
  demoIds: string[];
  lastViewedAt: string;
};

export type UserSession = {
  userId: string;
  email: string;
  tenantId: string;
  roles: string[];
};

// Static demo source for the current showcase.
// Replace with Supabase / API-backed persistence when backend integration is added.
export async function getAllDemos(): Promise<DemoApp[]> {
  return demoApps;
}

export async function getDemoBySlug(slug: string): Promise<DemoApp | undefined> {
  return demoApps.find((demo) => demo.slug === slug);
}

export async function searchDemos(options: DemoSearchOptions = {}): Promise<DemoApp[]> {
  const { query = '', category = 'All' } = options;
  const normalized = query.toLowerCase().trim();

  return demoApps.filter((demo) => {
    const matchesQuery = [demo.title, demo.description, demo.tags.join(' ')].join(' ').toLowerCase().includes(normalized);
    const matchesCategory = category === 'All' || demo.category === category;
    return matchesQuery && matchesCategory;
  });
}

export async function getFavoriteDemos(userId: string): Promise<string[]> {
  // Placeholder for future favorites persistence (Supabase / auth-backed storage).
  return [];
}

export async function saveFavoriteDemo(userId: string, demoId: string): Promise<{ success: boolean }> {
  // TODO: wire this into a real backend or Supabase table when available.
  console.debug('[DemoService] saveFavoriteDemo', { userId, demoId });
  return { success: true };
}

export async function removeFavoriteDemo(userId: string, demoId: string): Promise<{ success: boolean }> {
  console.debug('[DemoService] removeFavoriteDemo', { userId, demoId });
  return { success: true };
}

export async function getSavedWorkflows(userId: string): Promise<SavedWorkflow[]> {
  return [];
}

export async function saveWorkflow(userId: string, workflow: Omit<SavedWorkflow, 'createdAt'>): Promise<SavedWorkflow> {
  return {
    ...workflow,
    id: `workflow-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
}

export async function getRecommendationMemory(userId: string): Promise<RecommendationMemory[]> {
  return [];
}

export async function saveRecommendationMemory(memory: RecommendationMemory): Promise<RecommendationMemory> {
  return memory;
}
