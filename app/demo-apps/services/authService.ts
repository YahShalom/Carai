export type UserAccount = {
  id: string;
  email: string;
  name: string;
  tenantId: string;
  roles: string[];
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export async function getCurrentUser(): Promise<UserAccount | null> {
  // Placeholder for future authentication integration (Supabase, Auth.js, or custom API).
  return null;
}

export async function signIn(credentials: AuthCredentials): Promise<UserAccount | null> {
  console.debug('[AuthService] signIn', credentials.email);
  return null;
}

export async function signOut(): Promise<boolean> {
  console.debug('[AuthService] signOut');
  return true;
}

export async function requireAuth(): Promise<UserAccount | null> {
  return getCurrentUser();
}
