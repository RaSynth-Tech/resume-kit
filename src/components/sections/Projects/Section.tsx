import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaProjectDiagram, FaCalendarAlt, FaLink, FaArrowUp, FaArrowDown, FaGithub } from 'react-icons/fa';
import RichTextEditor from '@/components/common/RichTextEditor';
import { useResumeStore } from '@/contexts/resume/resumeStore';
import { Project } from '@/types/resume';

const ProjectsSection: React.FC = () => {
  const { resumeData, updateProject, currentResumeId } = useResumeStore();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [localProjects, setLocalProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (currentResumeId && resumeData && resumeData[currentResumeId]?.projects) {
      setLocalProjects(resumeData[currentResumeId].projects);
    } else {
      setLocalProjects([]); // Clear if no current resume or projects
    }
  }, [resumeData, currentResumeId]);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    setLocalProjects(prev => {
      const newProjects = [...prev];
      newProjects[index] = {
        ...newProjects[index],
        [field]: value
      };
      return newProjects;
    });
    
    // Update the global state
    const project = localProjects[index];
    if (project?.id) {
      updateProject(project.id, { [field]: value });
    }
  };

  if (!localProjects.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No projects added yet. Click the add button to create your first project.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {localProjects.map((project, index) => (
        <div 
          key={project.id || index} 
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
                    handleInputChange(index, 'sort_index', project.sort_index - 1);
                  }}
                  className="p-1.5 text-gray-600 hover:text-[#1e40af] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', project.sort_index + 1);
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
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
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
                      onChange={(e) => handleInputChange(index, 'start_date', e.target.value)}
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
                      onChange={(e) => handleInputChange(index, 'end_date', e.target.value)}
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
                    onChange={(e) => handleInputChange(index, 'url', e.target.value)}
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
                    onChange={(e) => handleInputChange(index, 'github_url', e.target.value)}
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
                    onChange={(value) => handleInputChange(index, 'description', value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Key Features & Achievements</label>
                <div className="relative">
                  <RichTextEditor
                    value={(project.bullets || []).join('\n')}
                    onChange={(value) => handleInputChange(index, 'bullets', value.split('\n'))}
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