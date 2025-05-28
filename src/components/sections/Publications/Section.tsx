import React, { useState, useEffect } from 'react';
import { Publications } from '@/types/resume';
import { FaChevronDown, FaChevronUp, FaBook, FaUsers, FaCalendarAlt, FaArrowUp, FaArrowDown, FaLink } from 'react-icons/fa';
import { useResumeStore } from '@/contexts/resume/resumeStore';

const PublicationsSection: React.FC = () => {
  const { resumeData, updatePublication, currentResumeId } = useResumeStore();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [localPublications, setLocalPublications] = useState<Publications[]>([]);

  useEffect(() => {
    if (currentResumeId && resumeData && resumeData[currentResumeId]?.publications) {
      setLocalPublications(resumeData[currentResumeId].publications);
    } else {
      setLocalPublications([]); // Clear if no current resume or publications
    }
  }, [resumeData, currentResumeId]);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    setLocalPublications(prev => {
      const newPublications = [...prev];
      newPublications[index] = {
        ...newPublications[index],
        [field]: value
      };
      return newPublications;
    });
    
    // Update the global state
    const publication = localPublications[index];
    if (publication?.id) {
      updatePublication(publication.id, { [field]: value });
    }
  };

  if (!localPublications.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No publications added yet. Click the add button to create your first publication.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {localPublications.map((publication, index) => (
        <div 
          key={publication.id || index} 
          className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* Accordion Header */}
          <div 
            className="p-4 cursor-pointer flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center space-x-3">
              <FaBook className="text-[#1e40af] text-lg" />
              <div>
                <h3 className="font-medium text-gray-900">
                  {publication.title || 'New Publication'}
                </h3>
                <p className="text-sm text-gray-600">
                  {publication.venue || 'Add Venue'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', publication.sort_index - 1);
                  }}
                  className="p-1.5 text-gray-600 hover:text-[#1e40af] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange(index, 'sort_index', publication.sort_index + 1);
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
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={publication.title}
                      onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter publication title"
                    />
                    <FaBook className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Venue</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={publication.venue || ''}
                      onChange={(e) => handleInputChange(index, 'venue', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter venue"
                    />
                    <FaBook className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Date Published</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={publication.date_published || ''}
                      onChange={(e) => handleInputChange(index, 'date_published', e.target.value)}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    />
                    <FaCalendarAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Co-authors</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={publication.co_authors?.join(', ') || ''}
                      onChange={(e) => handleInputChange(index, 'co_authors', e.target.value.split(', '))}
                      className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                      placeholder="Enter co-authors (comma-separated)"
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
                    value={publication.link || ''}
                    onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                    className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] transition-colors"
                    placeholder="Enter publication link"
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

export default PublicationsSection; 