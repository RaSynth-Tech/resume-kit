import React from 'react';

interface ResumePreviewProps {
  sections: Record<string, any[]>;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ sections }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 max-w-xs mx-auto cursor-pointer hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Resume Preview</h2>
      <div className="text-gray-600 text-sm md:text-base">
        {/* Profile Section */}
        {sections.profile && sections.profile.map((profile, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">PROFILE</h3>
            <p className="mb-1">{profile.full_name} - {profile.job_title}</p>
            <p className="mb-1">{profile.email} | {profile.phone}</p>
            <p className="mb-1">{profile.location}</p>
            <p className="mb-1">LinkedIn: {profile.linkedin_url}</p>
            <p className="mb-1">GitHub: {profile.github_url}</p>
            <p className="mb-1">Website: {profile.website_url}</p>
          </div>
        ))}

        {/* Experience Section */}
        {sections.experiences && sections.experiences.map((experience, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">EXPERIENCE</h3>
            <p className="mb-1">{experience.company} - {experience.title}</p>
            <ul className="list-disc pl-5">
              {experience.bullets.slice(0, 3).map((bullet: string, i: number) => (
                <li key={i} className="mb-1">{bullet}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Education Section */}
        {sections.education && sections.education.map((education, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">EDUCATION</h3>
            <p className="mb-1">{education.degree} - {education.institution}</p>
            <p className="mb-1">{education.start_date} - {education.end_date}</p>
          </div>
        ))}

        {/* Projects Section */}
        {sections.projects && sections.projects.map((project, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">PROJECTS</h3>
            <p className="mb-1">{project.name}</p>
          </div>
        ))}

        {/* Certifications Section */}
        {sections.certifications && sections.certifications.map((certification, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">CERTIFICATIONS</h3>
            <p className="mb-1">{certification.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePreview; 