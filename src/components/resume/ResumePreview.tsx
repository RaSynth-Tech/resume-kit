import React, { useState, useEffect, useRef } from 'react';
import ResumeDocument from './ResumeDocument'; // Adjust the import path as necessary
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const resumeRef = useRef<HTMLDivElement>(null);
  const { toPDF, targetRef } = usePDF({ filename: 'resume.pdf' });

  const calculateScale = () => {
    const scaleWidth = window.innerWidth / 595;
    const scaleHeight = window.innerHeight / 842;
    return Math.min(scaleWidth, scaleHeight);
  };

  useEffect(() => {
    if (isModalOpen) {
      setScale(calculateScale());
      const handleResize = () => setScale(calculateScale());
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isModalOpen]);

  const onViewResume = () => {
    setIsModalOpen(true);
    setScale(calculateScale()); // Set scale when opening the modal
  };

  const handleDownload = () => {
    toPDF();
  };

  // Set fixed A4 dimensions and enable scrolling for overflow
  const modalStyle = {
    width: '595px',
    height: '842px',
    overflow: 'auto', // Enable scrolling
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 max-w-xs mx-auto cursor-pointer hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Resume Preview</h2>
      <div className="flex gap-2">
        <button onClick={onViewResume} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          View Resume
        </button>
        <button onClick={handleDownload} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
          Download PDF
        </button>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-4 pt-6 rounded-lg mx-4 overflow-hidden"
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}
            ref={targetRef}
          >
            <ResumeDocument data={sections} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview; 