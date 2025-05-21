'use client';
import { ResumeData } from '../../types/resume';

export default function ResumeView({ data }: { data: ResumeData }) {
  const p = data.profile[0];

  return (
    <article className="mx-auto max-w-[816px] bg-white px-2 py-2 text-[11px] leading-[1.35] print:m-0 print:p-0">
      {/* ---------- Header ---------- */}
      <header className="border-b  border-gray-300 pb-4">
        <h1 className="text-2xl font-semibold tracking-wide">{p.full_name}</h1>
        <h2 className="text-lg font-medium text-gray-600">{p.job_title}</h2>

        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-600">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin_url && <a href={p.linkedin_url}>LinkedIn</a>}
          {p.github_url && <a href={p.github_url}>GitHub</a>}
          {p.website_url && <a href={p.website_url}>Portfolio</a>}
        </div>
      </header>

      {/* ---------- About ---------- */}
      {p.about_me && (
        <section className="mt-4">
          <h3 className="mb-1 text-[12px] font-semibold uppercase tracking-widest text-gray-500">
            Summary
          </h3>
          <p>{p.about_me}</p>
        </section>
      )}

      {/* ---------- Experience ---------- */}
      {data.experiences.length > 0 && (
        <section className="mt-2 space-y-2">
          <SectionHeading>Experience</SectionHeading>

          {data.experiences.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between font-medium">
                <span>{exp.title} – {exp.company}</span>
                <span className="shrink-0">
                  {formatDate(exp.start_date, exp.end_date)}
                </span>
              </div>

              <ul className="ml-2 list-disc">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* ---------- Education / Certifications / Projects ---------- */}
      {data.education.length > 0 && (
        <section className="mt-3 space-y-2">
          <SectionHeading>Education</SectionHeading>

          {data.education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between font-medium">
                <span>{edu.degree} – {edu.school}</span>
                <span className="shrink-0">
                  {formatDate(edu.start_date, edu.end_date)}
                </span>
              </div>

              {edu.description && <p className="ml-4">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.certifications.length > 0 && (
        <section className="mt-2 space-y-2">
          <SectionHeading>Certifications</SectionHeading>

          {data.certifications.map((cert) => (
            <div key={cert.id}>
              <div className="flex justify-between font-medium">
                <span>{cert.name}</span>
                <span className="shrink-0">
                  {formatDate(cert.start_date, cert.end_date)}
                </span>
              </div>

              {cert.description && <p className="ml-4">{cert.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="mt-2 space-y-2">
          <SectionHeading>Projects</SectionHeading>

          {data.projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between font-medium">
                <span>{proj.name}</span>
                <span className="shrink-0">
                  {formatDate(proj.start_date, proj.end_date)}
                </span>
              </div>

              {proj.description && <p className="ml-4">{proj.description}</p>}
            </div>
          ))}
        </section>
      )}
    </article>
  );
}

/* ---------- tiny helpers ---------- */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="border-b border-gray-300 pb-1 text-[12px] font-semibold uppercase tracking-widest text-gray-500">
      {children}
    </h3>
  );
}

function formatDate(startDate: string | null, endDate: string | null) {
  if (!startDate && !endDate) return '';
  if (!startDate) return ` ${endDate ? new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}`;
  if (!endDate) return ` ${startDate ? new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}`;
  return `${new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} – ${new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
}
