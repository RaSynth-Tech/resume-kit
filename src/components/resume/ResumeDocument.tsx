'use client';
import Head from 'next/head';
import { ResumeData } from '../../types/resume';
import React from 'react';
import '@/styles/resume.css';

interface ResumeViewProps {
  data: ResumeData;
  isEditing?: boolean;
  onEdit?: (field: string, value: any) => void;
}

export const ResumeView = React.forwardRef<HTMLDivElement, ResumeViewProps>(({ data, isEditing = false, onEdit }, ref) => {
  const p = data?.profile?.[0];

  const handleEdit = (field: string, value: any) => {
    if (onEdit) {
      onEdit(`profile.${field}`, value);
    }
  };

  if (!p) {
    return null;
  }

  return (
    <>
      <div ref={ref}
        className="resume-container mx-auto bg-[#232336] text-gray-100"
        style={{ 
          fontFamily: 'Trebuchet MS', 
          fontSize: '28px', 
          padding: '10px 48px', 
          margin: '32px auto',
          border: '1px solid #232336',
          backgroundColor: '#232336',
          color: '#f3f4f6',
          width: '8.3in',
          minHeight: '11.7in',
          boxSizing: 'border-box',
          pageBreakAfter: 'always',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.5), 0 2px 4px -1px rgba(0,0,0,0.4)'
        }}
      >
        {/* ---------- Header ---------- */}
        <header className="border-b border-gray-700 pb-6 text-center">
          <h1 className="text-xl font-semibold tracking-wide text-[22px] text-orange-400">
            {isEditing ? (
              <input
                type="text"
                value={p?.full_name || ''}
                onChange={(e) => handleEdit('full_name', e.target.value)}
                className="text-center w-full border border-gray-700 bg-[#181828] text-gray-100 placeholder-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none px-3 py-2"
                placeholder="Full Name"
              />
            ) : (
              <span className="text-gray-100">{p?.full_name || ''}</span>
            )}
          </h1>
          <h2 className="text-lg font-medium text-purple-300 text-[16px] mt-2">
            {isEditing ? (
              <input
                type="text"
                value={p?.job_title || ''}
                onChange={(e) => handleEdit('job_title', e.target.value)}
                className="text-center w-full border border-gray-700 bg-[#181828] text-gray-100 placeholder-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none px-3 py-2"
                placeholder="Job Title"
              />
            ) : (
              <span className="text-gray-100">{p?.job_title || ''}</span>
            )}
          </h2>

          {/* Contact Info */}
          <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[16px] text-gray-400">
            {p?.email && <span className="text-gray-400">•</span>}
            {p?.email && (
              isEditing ? (
                <input
                  type="email"
                  value={p?.email || ''}
                  onChange={(e) => handleEdit('email', e.target.value)}
                  className="border border-gray-700 bg-[#181828] text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none px-3 py-1"
                />
              ) : (
                <span>{p?.email}</span>
              )
            )}
            {p?.email && p?.phone && <span className="text-gray-400">•</span>}
            {p?.phone && (
              isEditing ? (
                <input
                  type="tel"
                  value={p?.phone || ''}
                  onChange={(e) => handleEdit('phone', e.target.value)}
                  className="border border-gray-700 bg-[#181828] text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none px-3 py-1"
                />
              ) : (
                <span>{p?.phone}</span>
              )
            )}
            {p?.phone && p?.location && <span className="text-gray-400">•</span>}
            {p?.location && (
              isEditing ? (
                <input
                  type="text"
                  value={p?.location || ''}
                  onChange={(e) => handleEdit('location', e.target.value)}
                  className="border border-gray-700 bg-[#181828] text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none px-3 py-1"
                />
              ) : (
                <span>{p?.location}</span>
              )
            )}
          </div>

          {/* Links */}
          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[12px] text-purple-300">
            {p?.linkedin_url && <span className="text-gray-400">•</span>}
            {p?.linkedin_url && (
              isEditing ? (
                <input
                  type="url"
                  value={p?.linkedin_url || ''}
                  onChange={(e) => handleEdit('linkedin_url', e.target.value)}
                  className="border border-gray-700 bg-[#181828] text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none px-3 py-1"
                />
              ) : (
                <a href={p?.linkedin_url} className="hover:text-orange-400 transition-colors duration-200 text-purple-300">{p?.linkedin_url}</a>
              )
            )}
            {p?.linkedin_url && p?.github_url && <span className="text-gray-400">•</span>}
            {p?.github_url && (
              isEditing ? (
                <input
                  type="url"
                  value={p?.github_url || ''}
                  onChange={(e) => handleEdit('github_url', e.target.value)}
                  className="border border-gray-700 bg-[#181828] text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none px-3 py-1"
                />
              ) : (
                <a href={p?.github_url} className="hover:text-orange-400 transition-colors duration-200 text-purple-300">{p?.github_url}</a>
              )
            )}
            {p?.github_url && p?.website_url && <span className="text-gray-400">•</span>}
            {p?.website_url && (
              isEditing ? (
                <input
                  type="url"
                  value={p?.website_url || ''}
                  onChange={(e) => handleEdit('website_url', e.target.value)}
                  className="border border-gray-700 bg-[#181828] text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none px-3 py-1"
                />
              ) : (
                <a href={p?.website_url} className="hover:text-orange-400 transition-colors duration-200 text-purple-300">{p?.website_url}</a>
              )
            )}
          </div>
        </header>

        {/* ---------- Summary ---------- */}
        {p?.about_me && (
          <section className="mt-2">
            <SectionHeading>Summary</SectionHeading>
            {isEditing ? (
              <textarea
                value={p?.about_me || ''}
                onChange={(e) => handleEdit('about_me', e.target.value)}
                className="w-full text-[12px] mt-1 border border-gray-700 bg-[#181828] text-gray-100 placeholder-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none p-2"
                rows={4}
                placeholder="Summary/About Me"
              />
            ) : (
              <p className="text-[12px] mt-1 text-gray-100">{p?.about_me}</p>
            )}
          </section>
        )}

        {/* ---------- Experience ---------- */}
        {data?.experiences?.length > 0 && (
          <section className="mt-2 space-y-2">
            <SectionHeading>Experience</SectionHeading>
            {data.experiences.map((exp) => (
              <div key={exp?.id} className="text-[12px] page-break-inside-avoid">
                <div className="flex justify-between font-medium">
                  <span>
                    {exp?.title || ''} – {exp?.company || ''}
                  </span>
                  <span className="shrink-0">
                    {formatDate(exp?.start_date, exp?.end_date)}
                  </span>
                </div>
                {exp?.bullets?.length > 0 && (
                  <ul className="list-disc ml-4">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b || ''}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* ---------- Education ---------- */}
        {data?.education?.length > 0 && (
          <section className="mt-2 space-y-2">
            <SectionHeading>Education</SectionHeading>
            {data.education.map((edu) => (
              <div key={edu?.id} className="text-[12px] page-break-inside-avoid">
                <div className="flex justify-between font-medium">
                  <span>
                    {edu?.degree || ''} – {edu?.institution || ''}
                  </span>
                  <span className="shrink-0">
                    {formatDate(edu?.start_date, edu?.end_date)}
                  </span>
                </div>
                {edu?.description && (<p className="ml-4">{edu.description}</p>)}
              </div>
            ))}
          </section>
        )}

        {/* ---------- Certifications ---------- */}
        {data?.certifications?.length > 0 && (
          <section className="mt-2 space-y-2">
            <SectionHeading>Certifications</SectionHeading>
            {data.certifications.map((cert) => (
              <div key={cert?.id} className="text-[12px] page-break-inside-avoid">
                <div className="flex justify-between font-medium">
                  <span>{cert?.name || ''}</span>
                  <span className="shrink-0">
                    {formatDate(cert?.start_date, cert?.end_date)}
                  </span>
                </div>
                {cert?.description && (<p className="ml-4">{cert.description}</p>)}
              </div>
            ))}
          </section>
        )}

        {/* ---------- Projects ---------- */}
        {data?.projects?.length > 0 && (
          <section className="mt-2 mb-2 space-y-2">
            <SectionHeading>Projects</SectionHeading>
            {data.projects.map((proj) => (
              <div key={proj?.id} className="text-[12px] page-break-inside-avoid">
                <div className="flex justify-between font-medium">
                  <span>{proj?.name || ''}</span>
                  <span className="shrink-0">
                    {formatDate(proj?.start_date, proj?.end_date)}
                  </span>
                </div>
                {proj?.description && (<p className="ml-4">{proj.description}</p>)}
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  );
});

/* ---------- tiny helpers ---------- */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="border-b border-gray-700 pb-2 text-[14px] font-semibold uppercase tracking-widest text-gray-400">
      {children}
    </h3>
  );
}

function formatDate(startDate: string | null | undefined, endDate: string | null | undefined) {
  if (!startDate && !endDate) return '';
  const format = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  if (!startDate && endDate) return ` ${format(endDate)}`;
  if (startDate && !endDate) return ` ${format(startDate)}`;
  if (startDate && endDate) return `${format(startDate)} – ${format(endDate)}`;
  return '';
}