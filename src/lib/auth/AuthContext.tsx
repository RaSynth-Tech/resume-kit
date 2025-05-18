'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, LoginCredentials, SignupCredentials, AuthResponse } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// List of public routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/auth/callback'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Check session on mount and route changes
  useEffect(() => {
    const hasAuthCookie = document.cookie.includes('sb-'); // Supabase cookie prefix
    if (hasAuthCookie) {
      console.log('hasAuthCookie', hasAuthCookie);
      checkSession();
    } else {
      setLoading(false);
      if (!publicRoutes.includes(pathname)) {
        router.push('/login');
      }
    }
  }, [pathname]); // Re-check session when route changes

  const checkSession = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/session');
      const { success, data, error } = await response.json();

      if (!success) {
        throw new Error(error || 'Failed to fetch session');
      }

      setUser(data.user);

      // Redirect logic
      if (!data.user && !publicRoutes.includes(pathname)) {
        // If not authenticated and not on a public route, redirect to login
        router.push('/login');
      } else if (data.user && publicRoutes.includes(pathname)) {
        // If authenticated and on a public route, redirect to dashboard
        router.push('/tailor');
      }
    } catch (err) {
      console.error('Session check error:', err);
      setError(err instanceof Error ? err.message : 'Failed to check session');
      
      // Only redirect to login if not on a public route
      if (!publicRoutes.includes(pathname)) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Login failed');
      }

      if (credentials.provider === 'google' && data.data?.url) {
        // Use Next.js router for external URLs
        router.push(data.data.url);
        return;
      }

      setUser(data.user!);
      router.push('/tailor'); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Signup failed');
      }

      setUser(data.user!);
      router.push('/tailor'); // Redirect to dashboard after successful signup
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Logout failed');
      }

      setUser(null);
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking session


  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 