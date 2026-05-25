'use client';

import { useCallback, useEffect, useState } from 'react';
import type { AuthCredentials, UserAccount } from '../services/authService';
import { getCurrentUser, signIn, signOut } from '../services/authService';

export type UseUserAccountState = {
  user: UserAccount | null;
  loading: boolean;
  signInUser: (credentials: AuthCredentials) => Promise<UserAccount | null>;
  signOutUser: () => Promise<void>;
};

export function useUserAccount(): UseUserAccountState {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const signInUser = useCallback(async (credentials: AuthCredentials) => {
    const signedIn = await signIn(credentials);
    setUser(signedIn);
    return signedIn;
  }, []);

  const signOutUser = useCallback(async () => {
    await signOut();
    setUser(null);
  }, []);

  return {
    user,
    loading,
    signInUser,
    signOutUser,
  };
}
