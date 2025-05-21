import React from 'react';
import { Languages } from './types';

interface LanguagesSectionProps {
  data: Languages[];
  onChange: (index: number, field: string, value: any) => void;
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ data, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((language, index) => (
        <div key={index} className="p-2 border rounded-md">
          <input
            type="text"
            value={language.language}
            onChange={(e) => onChange(index, 'language', e.target.value)}
            className="w-full p-1 mb-1 border rounded"
            placeholder="Language"
          />
          <input
            type="text"
            value={language.proficiency || ''}
            onChange={(e) => onChange(index, 'proficiency', e.target.value)}
            className="w-full p-1 mb-1 border rounded"
            placeholder="Proficiency"
          />
          <div className="flex justify-between">
            <button
              onClick={() => onChange(index, 'sort_index', language.sort_index - 1)}
              className="p-1 bg-gray-200 rounded"
            >
              Up
            </button>
            <button
              onClick={() => onChange(index, 'sort_index', language.sort_index + 1)}
              className="p-1 bg-gray-200 rounded"
            >
              Down
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LanguagesSection; 