import { Database } from '../../../types/supabase';

export type Education = {
  created_at: string;
  degree: string;
  end_date: string | null;
  gpa: number | null;
  id: string;
  institution: string;
  location: string | null;
  major: string | null;
  sort_index: number;
  start_date: string | null;
  tailoring_id: string;
  coursework?: string[];
}; 