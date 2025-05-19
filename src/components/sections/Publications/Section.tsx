import React from 'react';
import { Publications } from './types';

interface PublicationsSectionProps {
  data: Publications;
  onChange: (field: string, value: any) => void;
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ data, onChange }) => {
  return (
    <div className="p-4 border rounded-md">
      <input
        type="text"
        value={data.title}
        onChange={(e) => onChange('title', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Title"
      />
      <textarea
        value={data.co_authors?.join(', ') || ''}
        onChange={(e) => onChange('co_authors', e.target.value.split(', '))}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Co-authors"
      />
      <input
        type="text"
        value={data.venue || ''}
        onChange={(e) => onChange('venue', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Venue"
      />
      <input
        type="date"
        value={data.date_published || ''}
        onChange={(e) => onChange('date_published', e.target.value)}
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

export default PublicationsSection; 