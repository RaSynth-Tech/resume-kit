import React from 'react';
import { Projects } from './types';

interface ProjectsSectionProps {
  data: Projects;
  onChange: (field: string, value: any) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ data, onChange }) => {
  return (
    <div className="p-4 border rounded-md">
      <input
        type="text"
        value={data.name}
        onChange={(e) => onChange('name', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Project Name"
      />
      <textarea
        value={data.description || ''}
        onChange={(e) => onChange('description', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Description"
      />
      <textarea
        value={data.bullets.join('\n')}
        onChange={(e) => onChange('bullets', e.target.value.split('\n'))}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Bullets"
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

export default ProjectsSection; 