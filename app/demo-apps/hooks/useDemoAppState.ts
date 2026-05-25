'use client';

import { useCallback, useEffect, useState } from 'react';
import type { SavedWorkflow } from '../services/demoService';
import { getFavoriteDemos, getSavedWorkflows, removeFavoriteDemo, saveFavoriteDemo } from '../services/demoService';

export type UseDemoAppStateProps = {
  userId?: string;
};

export type DemoAppState = {
  favoriteIds: string[];
  savedWorkflows: SavedWorkflow[];
  isFavorite: (demoId: string) => boolean;
  toggleFavorite: (demoId: string) => Promise<void>;
};

export function useDemoAppState({ userId }: UseDemoAppStateProps): DemoAppState {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [savedWorkflows, setSavedWorkflows] = useState<SavedWorkflow[]>([]);

  useEffect(() => {
    if (!userId) {
      setFavoriteIds([]);
      setSavedWorkflows([]);
      return;
    }

    getFavoriteDemos(userId).then(setFavoriteIds).catch(() => setFavoriteIds([]));
    getSavedWorkflows(userId).then(setSavedWorkflows).catch(() => setSavedWorkflows([]));
  }, [userId]);

  const toggleFavorite = useCallback(
    async (demoId: string) => {
      if (!userId) {
        return;
      }

      const isCurrentlyFavorite = favoriteIds.includes(demoId);
      setFavoriteIds((current) =>
        current.includes(demoId) ? current.filter((id) => id !== demoId) : [...current, demoId],
      );

      if (isCurrentlyFavorite) {
        await removeFavoriteDemo(userId, demoId);
      } else {
        await saveFavoriteDemo(userId, demoId);
      }
    },
    [favoriteIds, userId],
  );

  return {
    favoriteIds,
    savedWorkflows,
    isFavorite: (demoId: string) => favoriteIds.includes(demoId),
    toggleFavorite,
  };
}
