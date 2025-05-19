import React from 'react';
import { Education } from './types';

interface EducationSectionProps {
  data: Education;
  onChange: (field: string, value: any) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({ data, onChange }) => {
  return (
    <div className="p-4 border rounded-md">
      <input
        type="text"
        value={data.institution}
        onChange={(e) => onChange('institution', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Institution"
      />
      <input
        type="text"
        value={data.degree}
        onChange={(e) => onChange('degree', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Degree"
      />
      <textarea
        value={data.coursework?.join('\n') || ''}
        onChange={(e) => onChange('coursework', e.target.value.split('\n'))}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Coursework"
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

export default EducationSection; 