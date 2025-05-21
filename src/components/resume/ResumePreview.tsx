import React, { useState, useEffect } from 'react';
import ResumeDocument from './ResumeDocument'; // Adjust the import path as necessary

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

  const calculateScale = () => {
    const scaleWidth = window.innerWidth / 595;
    const scaleHeight = window.innerHeight / 842;
    return Math.min(scaleWidth, scaleHeight, 1); // Ensure scale does not exceed 1
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
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 max-w-xs mx-auto cursor-pointer hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Resume Preview</h2>
      <button onClick={onViewResume} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        View Resume
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div
            className="bg-white p-4 rounded-lg mx-4 overflow-hidden"
            style={{
              width: '595px',
              height: '842px',
              transform: `scale(${Math.min(window.innerWidth / 595, (window.innerHeight * 0.8) / 842, 1)})`,
            }}
          >
            <ResumeDocument data={sections} />
            <button onClick={() => setIsModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview; 