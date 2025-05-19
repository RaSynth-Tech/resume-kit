import React from 'react';
import { Awards } from './types';

interface AwardsSectionProps {
  data: Awards;
  onChange: (field: string, value: any) => void;
}

const AwardsSection: React.FC<AwardsSectionProps> = ({ data, onChange }) => {
  return (
    <div className="p-4 border rounded-md">
      <input
        type="text"
        value={data.title}
        onChange={(e) => onChange('title', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Title"
      />
      <input
        type="text"
        value={data.issuer || ''}
        onChange={(e) => onChange('issuer', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Issuer"
      />
      <textarea
        value={data.description || ''}
        onChange={(e) => onChange('description', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Description"
      />
      <input
        type="date"
        value={data.date_awarded}
        onChange={(e) => onChange('date_awarded', e.target.value)}
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

export default AwardsSection; 