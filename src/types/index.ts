export interface TailoringFormData {
  jobDescription: string;
  resumeFile: File | null;
}

export interface TailoringResult {
  summary: string;
  bulletPoints: string[];
}

export interface PricingTier {
  name: string;
  price: number;
  features: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
}

export type TailoringRequest = {
  id: string;
  user_id: string | null;
  job_description: string | null;
  resume_path: string;
  created_at: string;
}

export interface SessionInfo {
  user: UserProfile | null;
  isAuthenticated: boolean;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: UserProfile;
}

export interface TailoringResponse {
  success: boolean;
  error?: string;
  data?: {
    id: string;
    email: string;
    resumePath: string;
    publicUrl: string;
  };
}

export type TailoringHistoryResponse = {
  success: boolean;
  data: TailoringRequest[];
}

export interface FormErrors {
  email?: string;
  jobDescription?: string;
  resumeFile?: string;
  submit?: string;
} 