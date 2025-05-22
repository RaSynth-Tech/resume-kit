import React, { useState } from 'react';
import { Certifications } from './types';
import { FaChevronDown, FaChevronUp, FaCertificate, FaBuilding, FaCalendarAlt, FaArrowUp, FaArrowDown, FaLink } from 'react-icons/fa';
import RichTextEditor from '@/components/common/RichTextEditor';

interface CertificationsSectionProps {
  data: Certifications[];
  onChange: (index: number, field: string, value: any) => void;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ data, onChange }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {data.map((certification, index) => (
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
              <FaCertificate className="text-[#1e40af] text-lg" />
              <div>
                <h3 className="font-medium text-gray-900">
                  {certification.name || 'New Certification'}
                </h3>
                <p className="text-sm text-gray-600">
                  {certification.issuer || 'Add Issuer'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(index, 'sort_index', certification.sort_index - 1);
                  }}
                  className="p-1.5 text-gray-600 hover:text-[#1e40af] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(index, 'sort_index', certification.sort_index + 1);
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
                  <label className="block text-sm font-medium text-gray-700">Certification Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={certification.name}
                      onChange={(e) => onChange(index, 'name', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter certification name"
                    />
                    <FaCertificate className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={certification.issuer}
                      onChange={(e) => onChange(index, 'issuer', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter issuing organization"
                    />
                    <FaBuilding className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Date Earned</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={certification.date_earned || ''}
                      onChange={(e) => onChange(index, 'date_earned', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    />
                    <FaCalendarAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={certification.expiration_date || ''}
                      onChange={(e) => onChange(index, 'expiration_date', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    />
                    <FaCalendarAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Credential URL</label>
                <div className="relative">
                  <input
                    type="url"
                    value={certification.credential_url || ''}
                    onChange={(e) => onChange(index, 'credential_url', e.target.value)}
                    className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    placeholder="Enter credential URL"
                  />
                  <FaLink className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <div className="relative">
                  <RichTextEditor
                    value={certification.description || ''}
                    onChange={(value) => onChange(index, 'description', value)}
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