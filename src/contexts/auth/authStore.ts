import { create } from 'zustand';
import { User, LoginCredentials, SignupCredentials, AuthResponse } from '@/types/auth';

type AuthStatus = 'initial' | 'authenticated' | 'unauthenticated' | 'loading';

interface AuthState {
  user: User | null;
  loading: boolean; // Kept for generic loading state, authStatus can be more specific
  error: string | null;
  authStatus: AuthStatus;
  setUser: (user: User | null) => void; // Potentially remove if authStatus handles all cases
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAuthStatus: (status: AuthStatus) => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials, onSuccess?: () => void) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  authStatus: 'initial',

  setUser: (user) => set(state => ({ user, authStatus: user ? 'authenticated' : 'unauthenticated' })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setAuthStatus: (authStatus) => set({ authStatus }),

  checkSession: async () => {
    set({ loading: true, error: null, authStatus: 'loading' });
    try {
      const response = await fetch('/api/auth/session');

      if (!response.ok) {
        let errorMessage = `API error ${response.status}: ${response.statusText}`;
        try {
          const errorBody = await response.json();
          if (errorBody && (errorBody.error || errorBody.message)) {
            errorMessage = errorBody.error || errorBody.message;
          }
        } catch (parseError) {
          // Ignore
        }
        throw new Error(errorMessage);
      }

      const { success, data, error: apiError } = await response.json();

      if (!success) {
        throw new Error(apiError || 'Failed to fetch session');
      }

      if (data?.user) { // If user data exists in session, they are authenticated
        set({ user: data.user, loading: false, error: null, authStatus: 'authenticated' });
      } else { // No user data in session
        set({ user: null, loading: false, error: null, authStatus: 'unauthenticated' });
      }
    } catch (err) {
      console.error('Session check error:', err);
      set({
        error: err instanceof Error ? err.message : 'Failed to check session',
        user: null,
        loading: false,
        authStatus: 'unauthenticated',
      });
    }
  },

  login: async (credentials) => {
    set({ loading: true, error: null, authStatus: 'loading' });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse = await response.json();

      if (!data.success || !data.user) { // Ensure user object is present
        throw new Error(data.error || 'Login failed');
      }

      if (credentials.provider === 'google' && data.data?.url) {
        window.location.href = data.data.url;
        // authStatus remains 'loading' as page will redirect
        return;
      }
      
      // Assuming login implies email is confirmed, or API handles this.
      // If login can result in an unconfirmed email state, this needs adjustment.
      set({ user: data.user, loading: false, error: null, authStatus: 'authenticated' });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Login failed', user: null, loading: false, authStatus: 'unauthenticated' });
      throw err;
    }
  },

  signup: async (credentials, onSuccess) => {
    set({ loading: true, error: null, authStatus: 'loading' });
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Signup failed');
      }

      // Attempt to clear any server-side session potentially created during signup
      
      // User is considered authenticated immediately after signup.
      // User object might be null here due to the preceding logout;
      // dashboard should call checkSession to get full user details.
      set({ user: null, loading: false, error: null, authStatus: 'authenticated' });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Signup failed', user: null, loading: false, authStatus: 'unauthenticated' });
      throw err;
    }
  },

  logout: async () => {
    set({ loading: true, error: null, authStatus: 'loading' });
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Logout failed');
      }

      // Clear cookies
      clearCookies();

      set({ user: null, loading: false, error: null, authStatus: 'unauthenticated' });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Logout failed', user: null, loading: false, authStatus: 'unauthenticated' });
      throw err;
    }
  },
}));

function clearCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
} 