export interface TailoringFormData {
  resume: string;
  jobDescription: string;
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