import React, { useState, useEffect } from 'react';
import { Education } from '@/types/resume';
import { FaChevronDown, FaChevronUp, FaUniversity, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useResumeStore } from '@/contexts/resume/resumeStore';

const EducationSection: React.FC = () => {
  const { resumeData, updateEducation, currentResumeId } = useResumeStore();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [localEducation, setLocalEducation] = useState<Education[]>([]);

  useEffect(() => {
    if (currentResumeId && resumeData && resumeData[currentResumeId]?.education) {
      setLocalEducation(resumeData[currentResumeId].education);
      console.log(resumeData[currentResumeId].education);
    } else {
      setLocalEducation([]);
    }
  }, [resumeData, currentResumeId]);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    setLocalEducation(prev => {
      const newEducation = [...prev];
      newEducation[index] = {
        ...newEducation[index],
        [field]: value
      };
      return newEducation;
    });
    
    // Update the global state
    const education = localEducation[index];
    if (education?.id) {
      updateEducation(education.id, { [field]: value });
    }
  };

  if (!localEducation.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No education entries added yet. Click the add button to create your first education entry.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {localEducation.map((education, index) => (
        <div 
          key={education.id || index} 
          className="border rounded-lg overflow-hidden bg-[#232336] shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* Accordion Header */}
          <div 
            className="p-4 cursor-pointer flex items-center justify-between bg-[#232336] hover:bg-[#2d2d44] transition-colors duration-200"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center space-x-3">
              <FaUniversity className="text-[#1e40af] text-lg" />
              <div>
                <h3 className="font-medium text-gray-100">
                  {education.institution || 'New Institution'}
                </h3>
                <p className="text-sm text-gray-400">
                  {education.degree || 'Add Degree'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', education.sort_index - 1);
                  }}
                  className="p-1.5 text-gray-400 hover:text-orange-400 hover:bg-[#232336] rounded-full transition-colors"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', education.sort_index + 1);
                  }}
                  className="p-1.5 text-gray-400 hover:text-orange-400 hover:bg-[#232336] rounded-full transition-colors"
                >
                  <FaArrowDown />
                </button>
              </div>
              {expandedIndex === index ? (
                <FaChevronUp className="text-gray-400" />
              ) : (
                <FaChevronDown className="text-gray-400" />
              )}
            </div>
          </div>

          {/* Accordion Content */}
          {expandedIndex === index && (
            <div className="p-4 space-y-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-orange-400">Institution</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={education.institution}
                      onChange={(e) => handleInputChange(index, 'institution', e.target.value)}
                      className="input-field pl-8"
                      placeholder="Enter institution name"
                    />
                    <FaUniversity className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-orange-400">Degree</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={education.degree}
                      onChange={(e) => handleInputChange(index, 'degree', e.target.value)}
                      className="input-field pl-8"
                      placeholder="Enter degree"
                    />
                    <FaGraduationCap className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-orange-400">Start Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={education.start_date || ''}
                      onChange={(e) => handleInputChange(index, 'start_date', e.target.value)}
                      className="input-field pl-8"
                    />
                    <FaCalendarAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-orange-400">End Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={education.end_date || ''}
                      onChange={(e) => handleInputChange(index, 'end_date', e.target.value)}
                      className="input-field pl-8"
                    />
                    <FaCalendarAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-orange-400">Description</label>
                <div className="relative">
                  <textarea
                    value={education.description || ''}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    className="input-field pl-8"
                    placeholder="Enter description"
                    rows={4}
                  />
                  <FaGraduationCap className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EducationSection; 