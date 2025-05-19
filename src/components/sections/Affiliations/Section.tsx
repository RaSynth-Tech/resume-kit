import React from 'react';
import { Affiliations } from './types';

interface AffiliationsSectionProps {
  data: Affiliations;
  onChange: (field: string, value: any) => void;
}

const AffiliationsSection: React.FC<AffiliationsSectionProps> = ({ data, onChange }) => {
  return (
    <div className="p-4 border rounded-md">
      <input
        type="text"
        value={data.organization}
        onChange={(e) => onChange('organization', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Organization"
      />
      <input
        type="text"
        value={data.role || ''}
        onChange={(e) => onChange('role', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Role"
      />
      <textarea
        value={data.description || ''}
        onChange={(e) => onChange('description', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Description"
      />
      <input
        type="date"
        value={data.start_date || ''}
        onChange={(e) => onChange('start_date', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="date"
        value={data.end_date || ''}
        onChange={(e) => onChange('end_date', e.target.value)}
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

export default AffiliationsSection; 