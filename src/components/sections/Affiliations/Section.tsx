import React, { useState, useEffect } from 'react';
import { Affiliations } from '@/types/resume';
import { FaChevronDown, FaChevronUp, FaBuilding, FaUserTie, FaCalendarAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useResumeStore } from '@/contexts/resume/resumeStore';

const AffiliationsSection: React.FC = () => {
  const { resumeData, updateAffiliation } = useResumeStore();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [localAffiliations, setLocalAffiliations] = useState<Affiliations[]>([]);

  useEffect(() => {
    if (resumeData?.affiliations) {
      setLocalAffiliations(resumeData.affiliations);
    }
  }, [resumeData?.affiliations]);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    setLocalAffiliations(prev => {
      const newAffiliations = [...prev];
      newAffiliations[index] = {
        ...newAffiliations[index],
        [field]: value
      };
      return newAffiliations;
    });
    
    // Update the global state
    const affiliation = localAffiliations[index];
    if (affiliation?.id) {
      updateAffiliation(affiliation.id, { [field]: value });
    }
  };

  if (!localAffiliations.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No affiliations added yet. Click the add button to create your first affiliation.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {localAffiliations.map((affiliation, index) => (
        <div 
          key={affiliation.id || index} 
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
                  {affiliation.organization || 'New Organization'}
                </h3>
                <p className="text-sm text-gray-600">
                  {affiliation.role || 'Add Role'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', affiliation.sort_index - 1);
                  }}
                  className="p-1.5 text-gray-600 hover:text-[#1e40af] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', affiliation.sort_index + 1);
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
                  <label className="block text-sm font-medium text-gray-700">Organization</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={affiliation.organization}
                      onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter organization name"
                    />
                    <FaBuilding className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={affiliation.role || ''}
                      onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter role"
                    />
                    <FaUserTie className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={affiliation.start_date || ''}
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
                      value={affiliation.end_date || ''}
                      onChange={(e) => handleInputChange(index, 'end_date', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    />
                    <FaCalendarAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <div className="relative">
                  <textarea
                    value={affiliation.description || ''}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    placeholder="Enter description"
                    rows={4}
                  />
                  <FaUserTie className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AffiliationsSection; 