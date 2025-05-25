import React, { useRef } from 'react';
import { ResumeView } from './ResumeDocument';
import { usePDF } from 'react-to-pdf';
import { useRouter, useParams } from 'next/navigation';

interface ResumeData {
  name: string;
  about: string;
  experience: string[];
  education: string[];
  certifications: string[];
  projects: string[];
}

interface ResumePreviewProps {
  sections: ResumeData;
}

const ResumePreview: React.FC<any> = ({ sections }) => {
  const router = useRouter();
  const params = useParams();
  const { targetRef } = usePDF();

  const handlePreview = () => {
    const id = params?.id as string;
    router.push(`/resume/${id}/preview`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 max-w-xs mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Resume Preview</h2>
      <div className="mb-4  flex overflow-hidden flex items-center justify-center align-middle" style={{ maxHeight: '300px' }}>
        <div 
          className="origin-center transform scale-[0.25]"
          style={{ width: '595px', height: '842px' }}
        >
          <ResumeView ref={targetRef} data={sections} />
        </div>
      </div>
      <div className="flex justify-center">
        <button 
          onClick={handlePreview} 
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
        >
          View Full Size
        </button>
      </div>
    </div>
  );
};

export default ResumePreview; 