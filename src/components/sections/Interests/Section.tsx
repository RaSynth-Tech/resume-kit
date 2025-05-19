import React from 'react';
import { Interests } from './types';

interface InterestsSectionProps {
  data: Interests;
  onChange: (field: string, value: any) => void;
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ data, onChange }) => {
  return (
    <div className="p-4 border rounded-md">
      <input
        type="text"
        value={data.interest}
        onChange={(e) => onChange('interest', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Interest"
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

export default InterestsSection; 