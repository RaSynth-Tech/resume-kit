import { PricingTier } from '@/types';

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    features: [
      'Basic resume tailoring',
      'Limited to 3 attempts per day',
      'Standard templates'
    ]
  },
  {
    name: 'Basic',
    price: 99,
    features: [
      'Advanced resume tailoring',
      'Unlimited attempts',
      'Premium templates',
      'Priority support'
    ]
  },
  {
    name: 'Pro',
    price: 299,
    features: [
      'Everything in Basic',
      'AI-powered suggestions',
      'Custom templates',
      '24/7 support',
      'PDF export'
    ]
  }
];

export const STEPS = [
  {
    title: 'Paste Job Description',
    description: 'Copy and paste the job description you want to tailor your resume for'
  },
  {
    title: 'Generate Tailored Resume',
    description: 'Our AI analyzes your resume and the job description to create a perfect match'
  },
  {
    title: 'Export Your Resume',
    description: 'Download your tailored resume in PDF format, ready to submit'
  }
]; 