'use client';
import Head from 'next/head';
import { ResumeData } from '../../types/resume';
import React from 'react';

export const ResumeView = React.forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const p = data.profile[0];

  return (
    <>
      <div ref={ref}
        className="resume-container mx-auto"
        style={{ 
          fontFamily: 'Trebuchet MS', 
          fontSize: '28px', 
          padding: '10px 48px', 
          margin: '32px auto',
          border: '1px solid #000',
          backgroundColor: 'white',
          width: '8.3in',
          height: '11.7in',
          boxSizing: 'border-box'
        }}
      >
        {/* ---------- Header ---------- */}
        <header className="avoid-break border-b border-gray-300 pb-6 text-center">
          <h1 className="text-xl font-semibold tracking-wide text-[22px]">
            {p.full_name}
          </h1>
          <h2 className="text-lg font-medium text-gray-600 text-[16px]">
            {p.job_title}
          </h2>

          {/* Contact Info */}
          <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[16px] text-gray-600">
            {p.email && <span className="text-gray-400">•</span>}
            {p.email && <span>{p.email}</span>}
            {p.email && p.phone && <span className="text-gray-400">•</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.phone && p.location && <span className="text-gray-400">•</span>}
            {p.location && <span>{p.location}</span>}
          </div>

          {/* Links */}
          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[12px] text-gray-600">
            {p.linkedin_url && <span className="text-gray-400">•</span>}
            {p.linkedin_url && <a href={p.linkedin_url}>{p.linkedin_url}</a>}
            {p.linkedin_url && p.github_url && <span className="text-gray-400">•</span>}
            {p.github_url && <a href={p.github_url}>{p.github_url}</a>}
            {p.github_url && p.website_url && <span className="text-gray-400">•</span>}
            {p.website_url && <a href={p.website_url}>{p.website_url}</a>}
          </div>
        </header>

        {/* ---------- Summary ---------- */}
        {p.about_me && (
          <section className="avoid-break mt-2">
            <SectionHeading>Summary</SectionHeading>
            <p className="text-[12px] mt-1">{p.about_me}</p>
          </section>
        )}

        {/* ---------- Experience ---------- */}
        {data.experiences.length > 0 && (
          <section className="avoid-break mt-2 space-y-2">
            <SectionHeading>Experience</SectionHeading>
            {data.experiences.map((exp) => (
              <div key={exp.id} className="text-[12px]">
                <div className="flex justify-between font-medium">
                  <span>
                    {exp.title} – {exp.company}
                  </span>
                  <span className="shrink-0">
                    {formatDate(exp.start_date, exp.end_date)}
                  </span>
                </div>
                <ul className="list-disc ml-4">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* ---------- Education ---------- */}
        {data.education.length > 0 && (
          <section className="avoid-break mt-2 space-y-2">
            <SectionHeading>Education</SectionHeading>
            {data.education.map((edu) => (
              <div key={edu.id} className="text-[12px]">
                <div className="flex justify-between font-medium">
                  <span>
                    {edu.degree} – {edu.school}
                  </span>
                  <span className="shrink-0">
                    {formatDate(edu.start_date, edu.end_date)}
                  </span>
                </div>
                {edu.description && (<p className="ml-4">{edu.description}</p>)}
              </div>
            ))}
          </section>
        )}

        {/* ---------- Certifications ---------- */}
        {data.certifications.length > 0 && (
          <section className="avoid-break mt-2 space-y-2">
            <SectionHeading>Certifications</SectionHeading>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="text-[12px]">
                <div className="flex justify-between font-medium">
                  <span>{cert.name}</span>
                  <span className="shrink-0">
                    {formatDate(cert.start_date, cert.end_date)}
                  </span>
                </div>
                {cert.description && (<p className="ml-4">{cert.description}</p>)}
              </div>
            ))}
          </section>
        )}

        {/* ---------- Projects ---------- */}
        {data.projects.length > 0 && (
          <section className="avoid-break mt-2 mb-2 space-y-2">
            <SectionHeading>Projects</SectionHeading>
            {data.projects.map((proj) => (
              <div key={proj.id} className="text-[12px]">
                <div className="flex justify-between font-medium">
                  <span>{proj.name}</span>
                  <span className="shrink-0">
                    {formatDate(proj.start_date, proj.end_date)}
                  </span>
                </div>
                {proj.description && (<p className="ml-4">{proj.description}</p>)}
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
    <h3 className="border-b border-gray-300 pb-2 text-[14px] font-semibold uppercase tracking-widest text-gray-500 avoid-break">
      {children}
    </h3>
  );
}

function formatDate(startDate: string | null, endDate: string | null) {
  if (!startDate && !endDate) return '';
  const format = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  if (!startDate) return ` ${format(endDate!)}`;
  if (!endDate) return ` ${format(startDate)}`;
  return `${format(startDate)} – ${format(endDate)}`;
}