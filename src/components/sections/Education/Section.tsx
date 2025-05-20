import React from 'react';
import { Education } from './types';

interface EducationSectionProps {
  data: Education[];
  onChange: (index: number, field: string, value: any) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({ data, onChange }) => {
  return (
    <div>
      {data.map((education, index) => (
        <div key={index} className="p-4 border rounded-md mb-4">
          <input
            type="text"
            value={education.institution}
            onChange={(e) => onChange(index, 'institution', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Institution"
          />
          <input
            type="text"
            value={education.degree}
            onChange={(e) => onChange(index, 'degree', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Degree"
          />
          <textarea
            value={education.degree || ''}
            onChange={(e) => onChange(index, 'coursework', e.target.value.split('\n'))}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Coursework"
          />
          <input
            type="date"
            value={education.start_date || ''}
            onChange={(e) => onChange(index, 'start_date', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            value={education.end_date || ''}
            onChange={(e) => onChange(index, 'end_date', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <div className="flex items-center">
            <button
              onClick={() => onChange(index, 'sort_index', education.sort_index - 1)}
              className="p-2 mr-2 bg-gray-200 rounded"
            >
              Up
            </button>
            <button
              onClick={() => onChange(index, 'sort_index', education.sort_index + 1)}
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

export default EducationSection; 