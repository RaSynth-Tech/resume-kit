import React, { useState } from 'react';
import { Projects } from './types';
import { FaChevronDown, FaChevronUp, FaProjectDiagram, FaCalendarAlt, FaLink, FaArrowUp, FaArrowDown, FaGithub } from 'react-icons/fa';
import RichTextEditor from '@/components/common/RichTextEditor';

interface ProjectsSectionProps {
  data: Projects[];
  onChange: (index: number, field: string, value: any) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ data, onChange }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {data.map((project, index) => (
        <div 
          key={index} 
          className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* Accordion Header */}
          <div 
            className="p-4 cursor-pointer flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center space-x-3">
              <FaProjectDiagram className="text-[#1e40af] text-lg" />
              <div>
                <h3 className="font-medium text-gray-900">
                  {project.name || 'New Project'}
                </h3>
                <p className="text-sm text-gray-600">
                  {project.description ? project.description.substring(0, 50) + '...' : 'Add project description'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(index, 'sort_index', project.sort_index - 1);
                  }}
                  className="p-1.5 text-gray-600 hover:text-[#1e40af] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(index, 'sort_index', project.sort_index + 1);
                  }}
                  className="p-1.5 text-gray-600 hover:text-[#1e40af] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowDown />
                </button>
              </div>
              {expandedIndex === index ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </div>
          </div>

          {/* Accordion Content */}
          {expandedIndex === index && (
            <div className="p-4 space-y-4 border-t">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => onChange(index, 'name', e.target.value)}
                    className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    placeholder="Enter project name"
                  />
                  <FaProjectDiagram className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={project.start_date || ''}
                      onChange={(e) => onChange(index, 'start_date', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    />
                    <FaCalendarAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={project.end_date || ''}
                      onChange={(e) => onChange(index, 'end_date', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    />
                    <FaCalendarAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Project URL</label>
                <div className="relative">
                  <input
                    type="url"
                    value={project.url || ''}
                    onChange={(e) => onChange(index, 'url', e.target.value)}
                    className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    placeholder="Enter project URL"
                  />
                  <FaLink className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">GitHub Repository</label>
                <div className="relative">
                  <input
                    type="url"
                    value={project.github_url || ''}
                    onChange={(e) => onChange(index, 'github_url', e.target.value)}
                    className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    placeholder="Enter GitHub repository URL"
                  />
                  <FaGithub className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <div className="relative">
                  <RichTextEditor
                    value={project.description || ''}
                    onChange={(value) => onChange(index, 'description', value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Key Features & Achievements</label>
                <div className="relative">
                  <RichTextEditor
                    value={(project.bullets || []).join('\n')}
                    onChange={(value) => onChange(index, 'bullets', value.split('\n'))}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectsSection; 