import React from 'react';
import { ResumeProfile } from './types';

interface ResumeProfileSectionProps {
  data: ResumeProfile;
  onChange: (field: string, value: any) => void;
}

const ResumeProfileSection: React.FC<ResumeProfileSectionProps> = ({ data, onChange }) => {
  return (
    <div className="p-4 border rounded-md">
      <input
        type="text"
        value={data.full_name}
        onChange={(e) => onChange('full_name', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Full Name"
      />
      <input
        type="email"
        value={data.email}
        onChange={(e) => onChange('email', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Email"
      />
      <input
        type="text"
        value={data.phone || ''}
        onChange={(e) => onChange('phone', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Phone"
      />
      <input
        type="text"
        value={data.location || ''}
        onChange={(e) => onChange('location', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Location"
      />
      <textarea
        value={data.about_me || ''}
        onChange={(e) => onChange('about_me', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="About Me"
      />
      <input
        type="text"
        value={data.github_url || ''}
        onChange={(e) => onChange('github_url', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="GitHub URL"
      />
      <input
        type="text"
        value={data.linkedin_url || ''}
        onChange={(e) => onChange('linkedin_url', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="LinkedIn URL"
      />
      <input
        type="text"
        value={data.website_url || ''}
        onChange={(e) => onChange('website_url', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Website URL"
      />
    </div>
  );
};

export default ResumeProfileSection; 