import { Database } from '../../../types/supabase';

export type Certifications = {
  created_at: string;
  date_earned: string | null;
  expiration_date: string | null;
  id: string;
  issuer: string;
  name: string;
  sort_index: number;
  tailoring_id: string;
  credential_url?: string | null;
  description?: string | null;
}; 