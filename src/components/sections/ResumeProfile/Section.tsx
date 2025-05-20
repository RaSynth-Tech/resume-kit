import React from 'react';
import { ResumeProfile } from './types';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaGlobe, FaInfoCircle } from 'react-icons/fa';
import RichTextEditor from '@/components/common/RichTextEditor';

interface ResumeProfileSectionProps {
  data: ResumeProfile[];
  onChange: (field: string, value: any) => void;
}

const ResumeProfileSection: React.FC<ResumeProfileSectionProps> = ({ data, onChange }) => {
  // data = data[0];
  
  const resumeProfile = data[0];
  console.log(data,"data");
  return (
    <div className="p-4 flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <FaUser className="mr-2 text-[#1e40af]" />
          <input
            type="text"
            value={resumeProfile.full_name}
            onChange={(e) => onChange('full_name', e.target.value)}
            className="w-full md:w-3/4 p-2 border rounded"
            placeholder="Full Name"
          />
        </div>
        <div className="flex items-center mb-2">
          <FaEnvelope className="mr-2 text-[#1e40af]" />
          <input
            type="email"
            value={resumeProfile.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full md:w-3/4 p-2 border rounded"
            placeholder="Email"
          />
        </div>
        <div className="flex items-center mb-2">
          <FaPhone className="mr-2 text-[#1e40af]" />
          <input
            type="text"
            value={resumeProfile.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
            className="w-full md:w-3/4 p-2 border rounded"
            placeholder="Phone"
          />
        </div>
        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="mr-2 text-[#1e40af]" />
          <input
            type="text"
            value={resumeProfile.location || ''}
            onChange={(e) => onChange('location', e.target.value)}
            className="w-full md:w-3/4 p-2 border rounded"
            placeholder="Location"
          />
        </div>
        <div className="flex items-center mb-2">
          <FaGithub className="mr-2 text-[#1e40af]" />
          <input
            type="text"
            value={resumeProfile.github_url || ''}
            onChange={(e) => onChange('github_url', e.target.value)}
            className="w-full md:w-3/4 p-2 border rounded"
            placeholder="GitHub URL"
          />
        </div>
        <div className="flex items-center mb-2">
          <FaLinkedin className="mr-2 text-[#1e40af]" />
          <input
            type="text"
            value={resumeProfile.linkedin_url || ''}
            onChange={(e) => onChange('linkedin_url', e.target.value)}
            className="w-full md:w-3/4 p-2 border rounded"
            placeholder="LinkedIn URL"
          />
        </div>
        <div className="flex items-center mb-2">
          <FaGlobe className="mr-2 text-[#1e40af]" />
          <input
            type="text"
            value={resumeProfile.website_url || ''}
            onChange={(e) => onChange('website_url', e.target.value)}
            className="w-full md:w-3/4 p-2 border rounded"
            placeholder="Website URL"
          />
        </div>
      </div>
      <div className="flex-1">
        <label htmlFor="aboutMe" className="block text-md font-bold font-medium text-[#1e40af] mb-1">ABOUT ME</label>
        <RichTextEditor
          value={resumeProfile.about_me || ''}
          onChange={(value) => onChange('about_me', value)}
        />
      </div>
    </div>
  );
};

export default ResumeProfileSection; 