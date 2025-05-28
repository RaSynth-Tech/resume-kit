'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ResumeView } from '@/components/resume/ResumeDocument';
import { usePDF } from 'react-to-pdf';
import { FaArrowLeft, FaDownload, FaEdit, FaSave } from 'react-icons/fa';
import { useResumeStore } from '@/contexts/resume/resumeStore';
import { ResumeData } from '@/types/resume';

export default function ResumePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const { toPDF, targetRef } = usePDF({filename: 'resume.pdf'});
  const { resumeData, loading: isLoading, error, fetchResume, updateProfile } = useResumeStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      fetchResume(id);
    }
  }, [id, fetchResume]);

  const handleEdit = async (field: string, value: any) => {
    if (!resumeData) return;

    try {
      if (field.startsWith('profile.')) {
        const profileField = field.split('.')[1];
        const updatedProfile = {
          ...resumeData.profile[0],
          [profileField]: value
        };
        updateProfile(updatedProfile);
      }
    } catch (error) {
      console.error('Error updating sections:', error);
    }
  };

  const handleSave = async () => {
    if (!resumeData) return;

    try {
      setIsSaving(true);
      setSaveMessage(null);

      if (!resumeData.profile[0]?.id) {
        throw new Error('Profile ID is missing');
      }

      const response = await fetch('/api/resume/sections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'profile',
          content: {
            ...resumeData.profile[0],
            tailoring_id: id
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      setSaveMessage('Changes saved successfully');
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : 'Failed to save changes');
    } finally {
      setIsSaving(false);
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
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!resumeData || !Object.keys(resumeData).length) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-gray-500">No resume data found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <FaEdit className="mr-2" />
              {isEditing ? 'Preview' : 'Edit'}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <FaSave className="mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => toPDF()}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <FaDownload className="mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        {saveMessage && (
          <div className={`mb-4 p-4 rounded-md ${saveMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {saveMessage}
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <ResumeView 
            ref={targetRef} 
            data={resumeData} 
            isEditing={isEditing}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
} 