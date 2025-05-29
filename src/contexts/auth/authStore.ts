import { create } from 'zustand';
import { User, LoginCredentials, SignupCredentials, AuthResponse } from '@/types/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials, onSuccess?: () => void) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  checkSession: async () => {
    try {
      set({ loading: true });
      const response = await fetch('/api/auth/session');
      const { success, data, error } = await response.json();

      if (!success) {
        throw new Error(error || 'Failed to fetch session');
      }

      // Only set user if they have confirmed their email
      if (data.user?.email_confirmed_at) {
        set({ user: data.user });
      } else {
        set({ user: null });
      }
    } catch (err) {
      console.error('Session check error:', err);
      set({ error: err instanceof Error ? err.message : 'Failed to check session' });
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  login: async (credentials) => {
    try {
      set({ loading: true, error: null });

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
        window.location.href = data.data.url;
        return;
      }

      set({ user: data.user! });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Login failed' });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  signup: async (credentials, onSuccess) => {
    try {
      set({ loading: true, error: null });

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Signup failed');
      }

      // Clear any existing session
      await fetch('/api/auth/logout', { method: 'POST' });
      
      // Call the success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Signup failed' });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Logout failed');
      }

      set({ user: null });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Logout failed' });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
})); 