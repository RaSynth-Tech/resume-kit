import React, { useState, useEffect } from 'react';
import { Conferences } from '@/types/resume';
import { FaChevronDown, FaChevronUp, FaUsers, FaUserTie, FaCalendarAlt, FaArrowUp, FaArrowDown, FaLink } from 'react-icons/fa';
import { useResumeStore } from '@/contexts/resume/resumeStore';

const ConferencesSection: React.FC = () => {
  const { resumeData, updateConference, currentResumeId } = useResumeStore();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [localConferences, setLocalConferences] = useState<Conferences[]>([]);

  useEffect(() => {
    if (currentResumeId && resumeData && resumeData[currentResumeId]?.conferences) {
      setLocalConferences(resumeData[currentResumeId].conferences);
    } else {
      setLocalConferences([]); // Clear if no current resume or conferences
    }
  }, [resumeData, currentResumeId]);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    setLocalConferences(prev => {
      const newConferences = [...prev];
      newConferences[index] = {
        ...newConferences[index],
        [field]: value
      };
      return newConferences;
    });
    
    // Update the global state
    const conference = localConferences[index];
    if (conference?.id) {
      updateConference(conference.id, { [field]: value });
    }
  };

  if (!localConferences.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No conferences added yet. Click the add button to create your first conference.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {localConferences.map((conference, index) => (
        <div 
          key={conference.id || index} 
          className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* Accordion Header */}
          <div 
            className="p-4 cursor-pointer flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center space-x-3">
              <FaUsers className="text-[#1e40af] text-lg" />
              <div>
                <h3 className="font-medium text-gray-900">
                  {conference.name || 'New Conference'}
                </h3>
                <p className="text-sm text-gray-600">
                  {conference.role || 'Add Role'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', conference.sort_index - 1);
                  }}
                  className="p-1.5 text-gray-600 hover:text-[#1e40af] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', conference.sort_index + 1);
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
                  <label className="block text-sm font-medium text-gray-700">Conference Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={conference.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter conference name"
                    />
                    <FaUsers className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={conference.role || ''}
                      onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter your role"
                    />
                    <FaUserTie className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={conference.date || ''}
                      onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    />
                    <FaCalendarAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Topic</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={conference.topic || ''}
                      onChange={(e) => handleInputChange(index, 'topic', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter topic"
                    />
                    <FaUsers className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Link</label>
                <div className="relative">
                  <input
                    type="url"
                    value={conference.link || ''}
                    onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                    className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    placeholder="Enter conference link"
                  />
                  <FaLink className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConferencesSection; 