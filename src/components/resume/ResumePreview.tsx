import React, { useRef } from 'react';
import ResumeDocument from './ResumeDocument';
import { usePDF } from 'react-to-pdf';

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
  const { toPDF, targetRef } = usePDF({ filename: 'resume.pdf' });

  const handleDownload = () => {
    toPDF();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 max-w-xs mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Resume Preview</h2>
      <div className="mb-4 overflow-auto" style={{ maxHeight: '400px' }}>
        <div 
          ref={targetRef} 
          className="bg-white transform scale-[0.6] origin-top-left"
          style={{ width: '595px', height: '842px' }}
        >
          <ResumeDocument data={sections} />
        </div>
      </div>
      <div className="flex justify-center">
        <button 
          onClick={handleDownload} 
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors duration-300"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ResumePreview; 