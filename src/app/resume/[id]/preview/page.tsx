'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ResumeView } from '@/components/resume/ResumeDocument';
import { usePDF } from 'react-to-pdf';
import { FaArrowLeft, FaDownload, FaEdit } from 'react-icons/fa';
import { useResumeStore } from '@/contexts/resume/resumeStore';
import { ResumeData } from '@/types/resume';

export default function ResumePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const { toPDF, targetRef } = usePDF({filename: 'resume.pdf'});
  const { resumeData, loading: isLoading, error, fetchResume } = useResumeStore();

  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      if (!resumeData?.[id]) {
        fetchResume(id);
      }
    }
  }, [id, fetchResume, resumeData]);

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
    <div className="min-h-screen bg-[#181828]">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-300 hover:text-orange-400"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push(`/resume/${id}`)}
              className="btn-primary"
            >
              <FaEdit className="mr-2" />
              Edit Resume
            </button>
            <button
              onClick={() => toPDF()}
              className="btn-primary"
            >
              <FaDownload className="mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="shadow-lg rounded-lg overflow-hidden bg-[#232336]">
          <ResumeView 
            ref={targetRef} 
            data={resumeData[id]} 
            isEditing={false}
          />
        </div>
      </div>
    </div>
  );
} 