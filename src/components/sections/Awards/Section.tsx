import React, { useState, useEffect } from 'react';
import { Awards } from '@/types/resume';
import { FaChevronDown, FaChevronUp, FaTrophy, FaBuilding, FaCalendarAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useResumeStore } from '@/contexts/resume/resumeStore';

const AwardsSection: React.FC = () => {
  const { resumeData, updateAward, currentResumeId } = useResumeStore();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [localAwards, setLocalAwards] = useState<Awards[]>([]);

  useEffect(() => {
    if (currentResumeId && resumeData && resumeData[currentResumeId]?.awards) {
      setLocalAwards(resumeData[currentResumeId].awards);
    } else {
      setLocalAwards([]); // Clear if no current resume or awards
    }
  }, [resumeData, currentResumeId]);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    setLocalAwards(prev => {
      const newAwards = [...prev];
      newAwards[index] = {
        ...newAwards[index],
        [field]: value
      };
      return newAwards;
    });
    
    // Update the global state
    const award = localAwards[index];
    if (award?.id) {
      updateAward(award.id, { [field]: value });
    }
  };

  if (!localAwards.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No awards added yet. Click the add button to create your first award.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {localAwards.map((award, index) => (
        <div 
          key={award.id || index} 
          className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* Accordion Header */}
          <div 
            className="p-4 cursor-pointer flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center space-x-3">
              <FaTrophy className="text-[#1e40af] text-lg" />
              <div>
                <h3 className="font-medium text-gray-900">
                  {award.title || 'New Award'}
                </h3>
                <p className="text-sm text-gray-600">
                  {award.issuer || 'Add Issuer'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', award.sort_index - 1);
                  }}
                  className="p-1.5 text-gray-600 hover:text-[#1e40af] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', award.sort_index + 1);
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
                  <label className="block text-sm font-medium text-gray-700">Award Title</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={award.title}
                      onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter award title"
                    />
                    <FaTrophy className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={award.issuer || ''}
                      onChange={(e) => handleInputChange(index, 'issuer', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter issuing organization"
                    />
                    <FaBuilding className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Date Awarded</label>
                <div className="relative">
                  <input
                    type="date"
                    value={award.date_awarded}
                    onChange={(e) => handleInputChange(index, 'date_awarded', e.target.value)}
                    className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                  />
                  <FaCalendarAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <div className="relative">
                  <textarea
                    value={award.description || ''}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    placeholder="Enter description"
                    rows={4}
                  />
                  <FaTrophy className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AwardsSection; 