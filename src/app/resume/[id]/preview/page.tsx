'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ResumeView } from '@/components/resume/ResumeDocument';
import { ResumeData, Profile, Experience, Education, Certification, Project } from '@/types/resume';
import { usePDF } from 'react-to-pdf';

interface Section {
  id: string;
  type: string;
  content: string;
  sort_index: number;
}

interface ApiResponse {
  resume_profiles: Profile[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  [key: string]: any[];
}

export default function ResumePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const { toPDF, targetRef } = usePDF({filename: 'resume.pdf'});
  const [sections, setSections] = useState<ResumeData>({
    profile: [],
    experiences: [],
    education: [],
    certifications: [],
    projects: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const id = params?.id as string;

  useEffect(() => {
    const fetchSections = async () => {
      if (!id) return;
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/resume/${id}/sections`);
        if (!res.ok) throw new Error('Failed to fetch sections');
        const data: ApiResponse = await res.json();
        console.log('API Response:', data);

        // Transform the data into ResumeData format
        const resumeData: ResumeData = {
          profile: data.resume_profiles || [],
          experiences: data.experiences || [],
          education: data.education || [],
          certifications: data.certifications || [],
          projects: data.projects || []
        };

        console.log('Parsed Resume Data:', resumeData);
        setSections(resumeData);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchSections();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 p-6 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!Object.keys(sections).length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">No sections found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white-50 py-12">
      <div className="mx-auto px-4">
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => router.push(`/resume/${id}`)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => toPDF()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Download PDF
          </button>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow-lg">
            <div className="bg-white">
                <ResumeView ref={targetRef}  data={sections} />
            </div>
        </div>
      </div>
    </main>
  );
} 