import React from 'react';
import { Certifications } from './types';

interface CertificationsSectionProps {
  data: Certifications;
  onChange: (field: string, value: any) => void;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ data, onChange }) => {
  return (
    <div className="p-4 border rounded-md">
      <input
        type="text"
        value={data.name}
        onChange={(e) => onChange('name', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Certification Name"
      />
      <input
        type="text"
        value={data.issuer}
        onChange={(e) => onChange('issuer', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Issuer"
      />
      <input
        type="date"
        value={data.date_earned}
        onChange={(e) => onChange('date_earned', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="date"
        value={data.expiration_date || ''}
        onChange={(e) => onChange('expiration_date', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <div className="flex items-center">
        <button
          onClick={() => onChange('sort_index', data.sort_index - 1)}
          className="p-2 mr-2 bg-gray-200 rounded"
        >
          Up
        </button>
        <button
          onClick={() => onChange('sort_index', data.sort_index + 1)}
          className="p-2 bg-gray-200 rounded"
        >
          Down
        </button>
      </div>
    </div>
  );
};

export default CertificationsSection; 