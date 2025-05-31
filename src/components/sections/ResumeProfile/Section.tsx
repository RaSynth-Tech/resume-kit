import React, { useState, useEffect } from 'react';
import { ResumeProfile } from './types';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaGlobe, FaInfoCircle } from 'react-icons/fa';
import RichTextEditor from '@/components/common/RichTextEditor';

interface ResumeProfileSectionProps {
  data: ResumeProfile[];
  onChange: (field: string, value: any, id: string) => void;
}

const ResumeProfileSection: React.FC<ResumeProfileSectionProps> = ({ data, onChange }) => {
  const resumeProfile = data[0];
  const [localProfile, setLocalProfile] = useState(resumeProfile);

  useEffect(() => {
    setLocalProfile(resumeProfile);
  }, [resumeProfile]);

  const handleInputChange = (field: string, value: string) => {
    setLocalProfile(prev => ({
      ...prev,
      [field]: value
    }));
    onChange(field, value, resumeProfile.id);
  };

  return (
    <div className="p-4 flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <FaUser className="mr-2 text-[#1e40af]" />
          <input
            type="text"
            value={localProfile.full_name}
            onChange={(e) => handleInputChange('full_name', e.target.value)}
            className="input-field"
            placeholder="Full Name"
          />
        </div>
        <div className="flex items-center mb-2">
          <FaEnvelope className="mr-2 text-[#1e40af]" />
          <input
            type="email"
            value={localProfile.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="input-field"
            placeholder="Email"
          />
        </div>
        <div className="flex items-center mb-2">
          <FaPhone className="mr-2 text-[#1e40af]" />
          <input
            type="text"
            value={localProfile.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="input-field"
            placeholder="Phone"
          />
        </div>
        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="mr-2 text-[#1e40af]" />
          <input
            type="text"
            value={localProfile.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="input-field"
            placeholder="Location"
          />
        </div>
        <div className="flex items-center mb-2">
          <FaGithub className="mr-2 text-[#1e40af]" />
          <input
            type="text"
            value={localProfile.github_url || ''}
            onChange={(e) => handleInputChange('github_url', e.target.value)}
            className="input-field"
            placeholder="GitHub URL"
          />
        </div>
        <div className="flex items-center mb-2">
          <FaLinkedin className="mr-2 text-[#1e40af]" />
          <input
            type="text"
            value={localProfile.linkedin_url || ''}
            onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
            className="input-field"
            placeholder="LinkedIn URL"
          />
        </div>
        <div className="flex items-center mb-2">
          <FaGlobe className="mr-2 text-[#1e40af]" />
          <input
            type="text"
            value={localProfile.website_url || ''}
            onChange={(e) => handleInputChange('website_url', e.target.value)}
            className="input-field"
            placeholder="Website URL"
          />
        </div>
      </div>
      <div className="flex-1">
        <label htmlFor="aboutMe" className="block text-md font-bold font-medium text-orange-400 mb-1">ABOUT ME</label>
        <RichTextEditor
          value={localProfile.about_me || ''}
          onChange={(value) => handleInputChange('about_me', value)}
        />
      </div>
    </div>
  );
};

export default ResumeProfileSection; 