import { Database } from '@/types/supabase';

type TableNames = keyof Database['public']['Tables'];

// Fallback values in case env vars are not set
const DEFAULT_TABLES = {
  USERS: 'users',
  TAILORING_DATA: 'tailoring_data',
  RESUME_SECTIONS: 'resume_sections'
} as const;

const DEFAULT_STORAGE = {
  RESUMES: 'resumes',
} as const;

export const DB_TABLES = {
  USERS: (process.env.DB_TABLE_USERS || DEFAULT_TABLES.USERS) as TableNames,
  TAILORING_DATA: (process.env.DB_TABLE_TAILORING_DATA || DEFAULT_TABLES.TAILORING_DATA) as TableNames,
  RESUME_SECTIONS: (process.env.DB_TABLE_RESUME_SECTIONS || DEFAULT_TABLES.RESUME_SECTIONS) as TableNames,
} as const;

export const STORAGE_BUCKETS = {
  RESUMES: (process.env.STORAGE_BUCKET_RESUMES || DEFAULT_STORAGE.RESUMES) as string,
} as const;

// Type guard to ensure table name is valid
export function isValidTableName(name: string): name is TableNames {
  return name in DB_TABLES;
} 