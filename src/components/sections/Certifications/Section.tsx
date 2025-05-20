import React from 'react';
import { Certifications } from './types';

interface CertificationsSectionProps {
  data: Certifications[];
  onChange: (index: number, field: string, value: any) => void;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ data, onChange }) => {
  return (
    <div>
      {data.map((certification, index) => (
        <div key={index} className="p-4 border rounded-md mb-4">
          <input
            type="text"
            value={certification.name}
            onChange={(e) => onChange(index, 'name', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Certification Name"
          />
          <input
            type="text"
            value={certification.issuer}
            onChange={(e) => onChange(index, 'issuer', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Issuer"
          />
          <input
            type="date"
            value={certification.date_earned || ''}
            onChange={(e) => onChange(index, 'date_earned', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            value={certification.expiration_date || ''}
            onChange={(e) => onChange(index, 'expiration_date', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <div className="flex items-center">
            <button
              onClick={() => onChange(index, 'sort_index', certification.sort_index - 1)}
              className="p-2 mr-2 bg-gray-200 rounded"
            >
              Up
            </button>
            <button
              onClick={() => onChange(index, 'sort_index', certification.sort_index + 1)}
              className="p-2 bg-gray-200 rounded"
            >
              Down
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationsSection; 