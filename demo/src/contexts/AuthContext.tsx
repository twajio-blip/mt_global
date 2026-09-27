import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface PortalUser {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: PortalUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const STORAGE_KEY = 'meridian-portal-user';
const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): PortalUser | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as PortalUser : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<PortalUser | null>(readStoredUser);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    if (email.trim().toLowerCase() !== 'recruiter@meridianmanpower.com' || password !== 'demo1234') {
      return false;
    }
    const next = { name: 'Nadia Karim', email: email.trim().toLowerCase() };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setUser(next);
    return true;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}