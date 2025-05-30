import React, { useState, useEffect } from 'react';
import { Languages } from '@/types/resume';
import { FaChevronDown, FaChevronUp, FaLanguage, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useResumeStore } from '@/contexts/resume/resumeStore';

const LanguagesSection: React.FC = () => {
  const { resumeData, updateLanguage, currentResumeId } = useResumeStore();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [localLanguages, setLocalLanguages] = useState<Languages[]>([]);

  useEffect(() => {
    if (currentResumeId && resumeData && resumeData[currentResumeId]?.languages) {
      setLocalLanguages(resumeData[currentResumeId].languages);
    } else {
      setLocalLanguages([]); // Clear if no current resume or languages
    }
  }, [resumeData, currentResumeId]);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    setLocalLanguages(prev => {
      const newLanguages = [...prev];
      newLanguages[index] = {
        ...newLanguages[index],
        [field]: value
      };
      return newLanguages;
    });
    
    // Update the global state
    const language = localLanguages[index];
    if (language?.id) {
      updateLanguage(language.id, { [field]: value });
    }
  };

  if (!localLanguages.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No languages added yet. Click the add button to create your first language.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {localLanguages.map((language, index) => (
        <div 
          key={language.id || index} 
          className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* Accordion Header */}
          <div 
            className="p-4 cursor-pointer flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center space-x-3">
              <FaLanguage className="text-[#1e40af] text-lg" />
              <div>
                <h3 className="font-medium text-gray-900">
                  {language.language || 'New Language'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language.proficiency || 'Add Proficiency'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', language.sort_index - 1);
                  }}
                  className="p-1.5 text-gray-600 hover:text-[#1e40af] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', language.sort_index + 1);
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
                  <label className="block text-sm font-medium text-gray-700">Language</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={language.language}
                      onChange={(e) => handleInputChange(index, 'language', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter language"
                    />
                    <FaLanguage className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Proficiency</label>
                  <div className="relative">
                    <select
                      value={language.proficiency || ''}
                      onChange={(e) => handleInputChange(index, 'proficiency', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    >
                      <option value="">Select proficiency</option>
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Basic">Basic</option>
                    </select>
                    <FaLanguage className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LanguagesSection; 