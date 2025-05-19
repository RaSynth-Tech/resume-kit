import React from 'react';
import { Conferences } from './types';

interface ConferencesSectionProps {
  data: Conferences;
  onChange: (field: string, value: any) => void;
}

const ConferencesSection: React.FC<ConferencesSectionProps> = ({ data, onChange }) => {
  return (
    <div className="p-4 border rounded-md">
      <input
        type="text"
        value={data.name}
        onChange={(e) => onChange('name', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Conference Name"
      />
      <input
        type="text"
        value={data.role || ''}
        onChange={(e) => onChange('role', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Role"
      />
      <textarea
        value={data.topic || ''}
        onChange={(e) => onChange('topic', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Topic"
      />
      <input
        type="date"
        value={data.date || ''}
        onChange={(e) => onChange('date', e.target.value)}
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

export default ConferencesSection; 