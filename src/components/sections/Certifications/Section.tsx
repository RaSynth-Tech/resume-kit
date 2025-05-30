import React, { useState, useEffect } from 'react';
import { Certification } from '@/types/resume';
import { FaChevronDown, FaChevronUp, FaCertificate, FaBuilding, FaCalendarAlt, FaArrowUp, FaArrowDown, FaLink } from 'react-icons/fa';
import RichTextEditor from '@/components/common/RichTextEditor';
import { useResumeStore } from '@/contexts/resume/resumeStore';

const CertificationsSection: React.FC = () => {
  const { resumeData, updateCertification, currentResumeId } = useResumeStore();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [localCertifications, setLocalCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    if (currentResumeId && resumeData && resumeData[currentResumeId]?.certifications) {
      setLocalCertifications(resumeData[currentResumeId].certifications);
    } else {
      setLocalCertifications([]); // Clear if no current resume or certifications
    }
  }, [resumeData, currentResumeId]);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    setLocalCertifications(prev => {
      const newCertifications = [...prev];
      newCertifications[index] = {
        ...newCertifications[index],
        [field]: value
      };
      return newCertifications;
    });
    
    // Update the global state
    const certification = localCertifications[index];
    if (certification?.id) {
      updateCertification(certification.id, { [field]: value });
    }
  };

  if (!localCertifications.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No certifications added yet. Click the add button to create your first certification.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {localCertifications.map((certification, index) => (
        <div 
          key={certification.id || index} 
          className="border rounded-lg overflow-hidden bg-[#232336] shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* Accordion Header */}
          <div 
            className="p-4 cursor-pointer flex items-center justify-between bg-[#232336] hover:bg-[#2d2d44] transition-colors duration-200"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center space-x-3">
              <FaCertificate className="text-[#1e40af] text-lg" />
              <div>
                <h3 className="font-medium text-gray-100">
                  {certification.name || 'New Certification'}
                </h3>
                <p className="text-sm text-gray-400">
                  {certification.issuer || 'Add Issuer'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', certification.sort_index - 1);
                  }}
                  className="p-1.5 text-gray-400 hover:text-orange-400 hover:bg-[#232336] rounded-full transition-colors"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', certification.sort_index + 1);
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
                  <label className="block text-sm font-medium text-orange-400">Certification Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={certification.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                      className="input-field pl-8"
                      placeholder="Enter certification name"
                    />
                    <FaCertificate className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-orange-400">Issuing Organization</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={certification.issuer || ''}
                      onChange={(e) => handleInputChange(index, 'issuer', e.target.value)}
                      className="input-field pl-8"
                      placeholder="Enter issuing organization"
                    />
                    <FaBuilding className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-orange-400">Date Earned</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={certification.start_date || ''}
                      onChange={(e) => handleInputChange(index, 'start_date', e.target.value)}
                      className="input-field pl-8"
                    />
                    <FaCalendarAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-orange-400">Expiration Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={certification.end_date || ''}
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
                  <RichTextEditor
                    value={certification.description || ''}
                    onChange={(value) => handleInputChange(index, 'description', value)}
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

export default CertificationsSection; 