import React from 'react';
import { Projects } from './types';

interface ProjectsSectionProps {
  data: Projects[];
  onChange: (index: number, field: string, value: any) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ data, onChange }) => {
  return (
    <div>
      {data.map((project, index) => (
        <div key={index} className="p-4 border rounded-md mb-4">
          <input
            type="text"
            value={project.name}
            onChange={(e) => onChange(index, 'name', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Project Name"
          />
          <textarea
            value={project.description || ''}
            onChange={(e) => onChange(index, 'description', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Description"
          />
          <textarea
            value={project.bullets.join('\n')}
            onChange={(e) => onChange(index, 'bullets', e.target.value.split('\n'))}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Bullets"
          />
          <input
            type="date"
            value={project.start_date || ''}
            onChange={(e) => onChange(index, 'start_date', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            value={project.end_date || ''}
            onChange={(e) => onChange(index, 'end_date', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <div className="flex items-center">
            <button
              onClick={() => onChange(index, 'sort_index', project.sort_index - 1)}
              className="p-2 mr-2 bg-gray-200 rounded"
            >
              Up
            </button>
            <button
              onClick={() => onChange(index, 'sort_index', project.sort_index + 1)}
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

export default ProjectsSection; 