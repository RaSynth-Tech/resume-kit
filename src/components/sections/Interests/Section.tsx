import React, { useState, useEffect } from 'react';
import { Interests } from '@/types/resume';
import { FaChevronDown, FaChevronUp, FaHeart, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useResumeStore } from '@/contexts/resume/resumeStore';

const InterestsSection: React.FC = () => {
  const { resumeData, updateInterest, currentResumeId } = useResumeStore();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [localInterests, setLocalInterests] = useState<Interests[]>([]);

  useEffect(() => {
    if (currentResumeId && resumeData && resumeData[currentResumeId]?.interests) {
      setLocalInterests(resumeData[currentResumeId].interests);
    } else {
      setLocalInterests([]); // Clear if no current resume or interests
    }
  }, [resumeData, currentResumeId]);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    setLocalInterests(prev => {
      const newInterests = [...prev];
      newInterests[index] = {
        ...newInterests[index],
        [field]: value
      };
      return newInterests;
    });
    
    // Update the global state
    const interest = localInterests[index];
    if (interest?.id) {
      updateInterest(interest.id, { [field]: value });
    }
  };

  if (!localInterests.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No interests added yet. Click the add button to create your first interest.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {localInterests.map((interest, index) => (
        <div 
          key={interest.id || index} 
          className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* Accordion Header */}
          <div 
            className="p-4 cursor-pointer flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center space-x-3">
              <FaHeart className="text-[#1e40af] text-lg" />
              <div>
                <h3 className="font-medium text-gray-900">
                  {interest.interest || 'New Interest'}
                </h3>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', interest.sort_index - 1);
                  }}
                  className="p-1.5 text-gray-600 hover:text-[#1e40af] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', interest.sort_index + 1);
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
                <label className="block text-sm font-medium text-gray-700">Interest</label>
                <div className="relative">
                  <input
                    type="text"
                    value={interest.interest}
                    onChange={(e) => handleInputChange(index, 'interest', e.target.value)}
                    className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    placeholder="Enter your interest"
                  />
                  <FaHeart className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InterestsSection; 