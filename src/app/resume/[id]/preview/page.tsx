'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ResumeView } from '@/components/resume/ResumeDocument';
import { ResumeData, Profile, Experience, Education, Certification, Project } from '@/types/resume';
import { usePDF } from 'react-to-pdf';
import { FaArrowLeft, FaDownload, FaEdit, FaSave } from 'react-icons/fa';

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
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

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

  const handleEdit = async (field: string, value: any) => {
    try {
      const updatedSections = { ...sections };
      if (field.startsWith('profile.')) {
        const profileField = field.split('.')[1];
        updatedSections.profile[0] = {
          ...updatedSections.profile[0],
          [profileField]: value
        };
      }
      setSections(updatedSections);
    } catch (error) {
      console.error('Error updating sections:', error);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveMessage(null);

      if (!sections.profile[0]?.id) {
        throw new Error('Profile ID is missing');
      }

      const response = await fetch(`/api/resume/${id}/sections`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'profile',
          content: {
            ...sections.profile[0],
            tailoring_id: id
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save changes');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to save changes');
      }

      setSaveMessage('Changes saved successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving changes:', error);
      setSaveMessage(error instanceof Error ? error.message : 'Failed to save changes');
    } finally {
      setIsSaving(false);
      // Clear save message after 3 seconds
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-red-50 p-6 rounded-lg shadow-sm">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!Object.keys(sections).length) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600">No sections found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Resume Preview</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            title="Go to Dashboard"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
            {saveMessage && (
              <span className={`text-sm font-medium ${saveMessage.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
                {saveMessage}
              </span>
            )}
            <button
              onClick={() => router.push(`/resume/${id}`)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              title="Edit Resume"
            >
              <FaEdit className="w-4 h-4 mr-2" />
              Edit Resume
            </button>
            <button
              onClick={() => toPDF()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              title="Download PDF"
            >
              <FaDownload className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
      
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-white">
              <ResumeView 
                ref={targetRef} 
                data={sections} 
                isEditing={isEditing}
                onEdit={handleEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 