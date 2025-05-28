'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ExperienceSection,
  CertificationsSection,
  EducationSection,
  ProjectsSection,
  AffiliationsSection,
  AwardsSection,
  ConferencesSection,
  InterestsSection,
  LanguagesSection,
  PublicationsSection,
  ResumeProfileSection,
} from '@/components/sections';
import ResumePreview from '@/components/resume/ResumePreview';
import { useResumeStore } from '@/contexts/resume/resumeStore';
import { ResumeData } from '@/types/resume';
interface Section {
  id: string;
  type: string;
  content: string;
  sort_index: number;
}

interface ApiResponse {
  [key: string]: Section[];
}

// Mapping section types to components
const sectionComponents = {
  experiences: ExperienceSection,
  certifications: CertificationsSection,
  education: EducationSection,
  projects: ProjectsSection,
  affiliations: AffiliationsSection,
  awards: AwardsSection,
  conferences: ConferencesSection,
  interests: InterestsSection,
  languages: LanguagesSection,
  publications: PublicationsSection,
  summary: ResumeProfileSection,
  profile: ResumeProfileSection,
};

export default function ResumeSectionEditor() {
  const router = useRouter();
  const params = useParams();
  const [sections, setSections] = useState<ResumeData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [draftContent, setDraftContent] = useState('');

  const id = params?.id as string;
  const { resumeData, updateProfile, updateExperience, updateEducation, updateCertification, updateProject, fetchResume, loading } = useResumeStore();

  const handleSectionChange = (fieldOrIndex: string | number, valueOrField?: any, value?: any) => {
    if (!resumeData) return;
  
    const currentSectionType = Object.keys(resumeData)[currentIndex];
    const field = typeof fieldOrIndex === 'number' ? valueOrField : fieldOrIndex;
    const newValue = typeof fieldOrIndex === 'number' ? value : valueOrField;
    const index = typeof fieldOrIndex === 'number' ? fieldOrIndex : 0;
  
    // Update based on section type
    switch (currentSectionType) {
      case 'profile':
        updateProfile({
          ...resumeData.profile[0],
          [field]: newValue
        });
        break;
      case 'experiences':
        updateExperience(resumeData.experiences[index].id, {
          [field]: newValue
        });
        break;
      case 'education':
        updateEducation(resumeData.education[index].id, {
          [field]: newValue
        });
        break;
      case 'certifications':
        updateCertification(resumeData.certifications[index].id, {
          [field]: newValue
        });
        break;
      case 'projects':
        updateProject(resumeData.projects[index].id, {
          [field]: newValue
        });
        break;
    }
  };

  useEffect(() => {
    fetchResume(id);
  }, [fetchResume, id]);

  useEffect(() => {
    setSections(resumeData);
  }, [resumeData]);

  const handlePrevious = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const handleNext = () => {
    if (!sections) return;
    currentIndex < Object.keys(sections).length - 1
      ? setCurrentIndex(currentIndex + 1)
      : router.push(`/resume/${id}/review`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 p-6 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!sections) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">No sections found.</p>
      </div>
    );
  }

  if (!sections) return null;
  const sectionTypes = (Object.keys(sections) as Array<keyof ResumeData>).filter(type => sections[type].length > 0);
  const currentSectionType = sectionTypes[currentIndex];
  const current = sections[currentSectionType] || [];
  const CurrentSectionComponent = current.length > 0
    ? sectionComponents[currentSectionType.toLowerCase() as keyof typeof sectionComponents]
    : null;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {sectionTypes.length > 0 && (
          <div className="flex justify-center space-x-3 overflow-x-auto mb-8">
            {sectionTypes.map((type, idx) => (
              <button
                key={type}
                onClick={() => setCurrentIndex(idx)}
                className={`
                  whitespace-nowrap
                  px-4 py-2
                  rounded-full
                  text-sm font-medium
                  transition-all duration-150
                  ${idx === currentIndex
                    ? 'bg-blue-800 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-8">
            {CurrentSectionComponent && current.length > 0 && (
              <CurrentSectionComponent
                data={current as any}
                onChange={handleSectionChange}
              />
            )}

            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`
                  px-5 py-2 rounded-md text-sm font-medium
                  ${currentIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'}
                `}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-5 py-2 bg-blue-800 text-white rounded-md text-sm font-medium hover:bg-blue-900"
              >
                {currentIndex === sectionTypes.length - 1 ? 'Review' : 'Next'}
              </button>
            </div>
          </div>

          {/* Right Column: Resume Preview */}
          <ResumePreview sections={sections} />
        </div>
      </div>
    </main>
  );
}
