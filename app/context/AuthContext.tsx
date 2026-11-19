import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthUser, loginRequest, meRequest, Role } from '../services/api';

const TOKEN_STORAGE_KEY = 'auth_token';

interface AuthContextData {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  signOut: () => Promise<void>;
  hasRole: (roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const savedToken = await SecureStore.getItemAsync(TOKEN_STORAGE_KEY);
        if (!savedToken) return;

        const profile = await meRequest(savedToken);
        setToken(savedToken);
        setUser(profile);
      } catch {
        await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadSession();
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const response = await loginRequest(email, password);
      await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, response.token);
      setToken(response.token);
      setUser(response.user);
      return { ok: true };
    } catch (err: any) {
      return { ok: false, message: err?.message ?? 'Erro ao autenticar.' };
    }
  }

  async function signOut() {
    await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }

  function hasRole(roles: Role[]) {
    return !!user && roles.includes(user.role);
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signIn, signOut, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}