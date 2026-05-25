export type AnalyticsEvent = {
  name: string;
  category: string;
  metadata?: Record<string, unknown>;
  timestamp?: string;
  userId?: string;
};

export function initializeAnalytics(): void {
  if (typeof window !== 'undefined') {
    console.debug('[AnalyticsService] initializeAnalytics');
  }
}

export async function trackPageView(path: string, userId?: string): Promise<{ success: boolean }> {
  console.debug('[AnalyticsService] trackPageView', { path, userId });
  return { success: true };
}

export async function trackEvent(event: AnalyticsEvent): Promise<{ success: boolean }> {
  console.debug('[AnalyticsService] trackEvent', event);
  return { success: true };
}
