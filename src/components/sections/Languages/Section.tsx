import React from 'react';
import { Languages } from './types';

interface LanguagesSectionProps {
  data: Languages;
  onChange: (field: string, value: any) => void;
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ data, onChange }) => {
  return (
    <div className="p-4 border rounded-md">
      <input
        type="text"
        value={data.language}
        onChange={(e) => onChange('language', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Language"
      />
      <input
        type="text"
        value={data.proficiency || ''}
        onChange={(e) => onChange('proficiency', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Proficiency"
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

export default LanguagesSection; 