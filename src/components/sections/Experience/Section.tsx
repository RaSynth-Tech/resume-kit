import React from 'react';
import { Experience } from './types';

interface ExperienceSectionProps {
  data: Experience;
  onChange: (field: string, value: any) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data, onChange }) => {
  return (
    <div className="p-4 border rounded-md">
      <input
        type="text"
        value={data.company}
        onChange={(e) => onChange('company', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Company"
      />
      <input
        type="text"
        value={data.title}
        onChange={(e) => onChange('title', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Title"
      />
      <textarea
        value={data.bullets.join('\n')}
        onChange={(e) => onChange('bullets', e.target.value.split('\n'))}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Bullets"
      />
      <input
        type="date"
        value={data.start_date}
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

export default ExperienceSection; 