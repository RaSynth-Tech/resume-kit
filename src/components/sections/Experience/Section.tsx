import React, { useState } from 'react';
import { Experience } from './types';
import { FaChevronDown, FaChevronUp, FaBuilding, FaBriefcase, FaCalendarAlt, FaListUl, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import RichTextEditor from '@/components/common/RichTextEditor';

interface ExperienceSectionProps {
  data: Experience[];
  onChange: (index: number, field: string, value: any) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data, onChange }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {data.map((experience, index) => (
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
              <FaBuilding className="text-[#1e40af] text-lg" />
              <div>
                <h3 className="font-medium text-gray-900">
                  {experience.company || 'New Company'}
                </h3>
                <p className="text-sm text-gray-600">
                  {experience.title || 'Add Position Title'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(index, 'sort_index', experience.sort_index - 1);
                  }}
                  className="p-1.5 text-gray-600 hover:text-[#1e40af] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(index, 'sort_index', experience.sort_index + 1);
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) => onChange(index, 'company', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter company name"
                    />
                    <FaBuilding className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={experience.title}
                      onChange={(e) => onChange(index, 'title', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter position title"
                    />
                    <FaBriefcase className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={experience.start_date}
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
                      value={experience.end_date || ''}
                      onChange={(e) => onChange(index, 'end_date', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    />
                    <FaCalendarAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Responsibilities & Achievements</label>
                <div className="relative">
                  <RichTextEditor
                    value={experience.bullets.join('\n')}
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

export default ExperienceSection; 