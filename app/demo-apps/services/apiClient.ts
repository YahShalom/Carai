import type { DemoApp } from './demoService';

export async function fetchApi<ResponseData = unknown>(path: string, init?: RequestInit): Promise<ResponseData> {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers as Record<string, string>),
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<ResponseData>;
}

export async function fetchDemos(): Promise<DemoApp[]> {
  return fetchApi<DemoApp[]>('/api/demo-apps');
}
