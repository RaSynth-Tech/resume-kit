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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const id = params?.id as string;
  const { resumeData, updateProfile, updateExperience, updateEducation, updateCertification, updateProject, fetchResume, loading } = useResumeStore();

  // Validate ID and fetch data
  useEffect(() => {
    if (!id) {
      setError('Invalid resume ID');
      return;
    }
    if (!resumeData?.[id]) {
      fetchResume(id);
    }
  }, [id, fetchResume, resumeData]);

  const handleSectionChange = (fieldOrIndex: string | number, valueOrField?: any, value?: any) => {
    if (!resumeData || !id) return;
  
    const currentSectionType = Object.keys(resumeData[id])[currentIndex];
    const field = typeof fieldOrIndex === 'number' ? valueOrField : fieldOrIndex;
    const newValue = typeof fieldOrIndex === 'number' ? value : valueOrField;
    const index = typeof fieldOrIndex === 'number' ? fieldOrIndex : 0;
  
    // Update based on section type
    switch (currentSectionType) {
      case 'profile':
        updateProfile({
          ...resumeData[id].profile[0],
          [field]: newValue
        });
        break;
      case 'experiences':
        updateExperience(resumeData[id].experiences[index].id, {
          [field]: newValue
        });
        break;
      case 'education':
        updateEducation(resumeData[id].education[index].id, {
          [field]: newValue
        });
        break;
      case 'certifications':
        updateCertification(resumeData[id].certifications[index].id, {
          [field]: newValue
        });
        break;
      case 'projects':
        updateProject(resumeData[id].projects[index].id, {
          [field]: newValue
        });
        break;
    }
  };

  const goToIndex = (idx: number) => {
    if (!resumeData?.[id]) return;
    if (idx < 0 || idx >= Object.keys(resumeData[id]).length) return;
    setCurrentIndex(idx);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      goToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (!resumeData?.[id]) return;
    if (currentIndex < Object.keys(resumeData[id]).length - 1) {
      goToIndex(currentIndex + 1);
    } else {
      router.push(`/resume/${id}/preview`);
    }
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

  if (!resumeData?.[id]) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">No resume data found.</p>
      </div>
    );
  }

  const sectionTypes = Object.keys(resumeData[id]).filter(type => resumeData[id][type].length > 0);
  const currentSectionType = sectionTypes[currentIndex];
  const current = resumeData[id][currentSectionType] || [];
  const CurrentSectionComponent = current.length > 0
    ? sectionComponents[currentSectionType.toLowerCase() as keyof typeof sectionComponents]
    : null;

  return (
    <main className="min-h-screen bg-[#181828] py-12">
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
                  rounded-md
                  text-sm font-medium
                  transition-all duration-150
                  ${idx === currentIndex
                    ? 'btn-primary bg-gradient-to-r from-orange-500 to-purple-700 text-white border-orange-500 shadow-sm'
                    : 'bg-[#232336] text-gray-100 border border-gray-700 hover:bg-[#2d2d44]'}
                `}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-[#232336] rounded-2xl shadow-xl p-8 text-gray-100">
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
                  inline-flex items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md
                  transition-colors duration-200
                  ${currentIndex === 0
                    ? 'bg-[#181828] text-gray-500 cursor-not-allowed'
                    : 'btn-primary'}
                `}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="btn-primary"
              >
                {currentIndex === sectionTypes.length - 1 ? 'Preview' : 'Next'}
              </button>
            </div>
          </div>

          {/* Right Column: Resume Preview */}
          <ResumePreview sections={resumeData[id]} />
        </div>
      </div>
    </main>
  );
}
