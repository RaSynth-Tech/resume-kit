import { Database } from '@/types/supabase';

export interface ResumeSection {
  type: string;
  content: string;
  sort_index: number;
}

export interface ParsedResume {
  rawText: string;
  sections: ResumeSection[];
}

export interface ResumeParser {
  parse(file: File): Promise<ParsedResume>;
}

export interface ResumeSectionInsert {
  id: string;
  tailoring_id: string;
  type: string;
  content: string;
  sort_index: number;
  created_at: string;
}

export interface TailoringDataInsert {
  id?: string;
  user_id: string;
  job_description: string;
  resume_path: string;
  created_at: string;
}

export type ParserType = 'basic';

export interface ParserFactory {
  getParser(type: ParserType): ResumeParser;
} 