import React from 'react';

interface ResumePreviewProps {
  sections: Record<string, any[]>;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ sections }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-4">Resume Preview</h2>
      <div className="text-gray-600">
        {Object.entries(sections).map(([type, items]) => (
          <div key={type} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{type.toUpperCase()}</h3>
            {items.map((item, index) => (
              <p key={index} className="mb-1">{item.content}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePreview; 