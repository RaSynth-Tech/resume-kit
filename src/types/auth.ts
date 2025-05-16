export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
  data?: {
    url?: string;
  };
}

export interface SessionInfo {
  user: User | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  provider?: 'google';
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
} 