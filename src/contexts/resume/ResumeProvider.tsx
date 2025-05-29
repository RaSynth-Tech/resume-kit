'use client';

import { useEffect } from 'react';
import { useResumeStore } from './resumeStore';

interface ResumeProviderProps {
  children: React.ReactNode;
  initialResumeId?: string;
}

export function ResumeProvider({ children, initialResumeId }: ResumeProviderProps) {
  const { fetchResume } = useResumeStore();

  // Fetch initial resume data if ID is provided
  useEffect(() => {
    if (initialResumeId) {
      fetchResume(initialResumeId);
    }
  }, [initialResumeId, fetchResume]);

  return <>{children}</>;
} 