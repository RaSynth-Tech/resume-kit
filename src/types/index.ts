export interface TailoringFormData {
  email: string;
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

export interface TailoringRequest {
  email: string;
  job_description: string;
  resume_path: string;
  created_at: string;
}

export interface FormErrors {
  email?: string;
  jobDescription?: string;
  resumeFile?: string;
  submit?: string;
} 