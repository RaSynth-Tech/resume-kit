import React from 'react';
import { Experience } from './types';

interface ExperienceSectionProps {
  data: Experience[];
  onChange: (index: number, field: string, value: any) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data, onChange }) => {
  console.log(data,"data");
  return (
    <div>
      {data.map((experience, index) => (
        <div key={index} className="p-4 border rounded-md mb-4">
          <input
            type="text"
            value={experience.company}
            onChange={(e) => onChange(index, 'company', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Company"
          />
          <input
            type="text"
            value={experience.title}
            onChange={(e) => onChange(index, 'title', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Title"
          />
          <textarea
            value={experience.bullets.join('\n')}
            onChange={(e) => onChange(index, 'bullets', e.target.value.split('\n'))}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Bullets"
          />
          <input
            type="date"
            value={experience.start_date}
            onChange={(e) => onChange(index, 'start_date', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            value={experience.end_date || ''}
            onChange={(e) => onChange(index, 'end_date', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <div className="flex items-center">
            <button
              onClick={() => onChange(index, 'sort_index', experience.sort_index - 1)}
              className="p-2 mr-2 bg-gray-200 rounded"
            >
              Up
            </button>
            <button
              onClick={() => onChange(index, 'sort_index', experience.sort_index + 1)}
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

export default ExperienceSection; 