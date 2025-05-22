import { Database } from '../../../types/supabase';

export type Projects = {
  created_at: string;
  description: string | null;
  end_date: string | null;
  id: string;
  link: string | null;
  name: string;
  role: string | null;
  sort_index: number;
  start_date: string | null;
  tailoring_id: string;
  bullets: string[];
  url?: string | null;
  github_url?: string | null;
}; 