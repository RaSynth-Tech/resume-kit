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
  const [sections, setSections] = useState<Record<string, Section[]>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draftContent, setDraftContent] = useState('');

  const id = params?.id as string;

  useEffect(() => {
    const fetchSections = async () => {
      if (!id) return;
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/resume/${id}/sections`);
        if (!res.ok) throw new Error('Failed to fetch sections');
        const data: ApiResponse = await res.json();

        // Flatten the sections into a single array
        const flattenedSections: Section[] = Object.entries(data).flatMap(([type, sections]) =>
          sections.map(section => ({ ...section, type }))
        );

        // Group sections by type
        const updatedSections = flattenedSections.map(section => ({
          ...section,
          type: section.type === 'resume_profiles' ? 'profile' : section.type,
        }));
        const groupedSections = updatedSections.reduce((acc, section) => {
          if (!acc[section.type]) {
            acc[section.type] = [];
          }
          acc[section.type].push(section);
          return acc;
        }, {} as Record<string, Section[]>);

        // Order the sections in a generally expected way
        const orderedSectionTypes = [
          'profile',
          'experiences',
          'education',
          'certifications',
          'projects',
          'interests',
          'languages',
          'affiliations',
          'awards',
          'publications',
          'conferences'
        ];

        const orderedSections = orderedSectionTypes.reduce((acc, type) => {
          if (groupedSections[type]) {
            acc[type] = groupedSections[type];
          }
          return acc;
        }, {} as Record<string, Section[]>);

        setSections(orderedSections);
        console.log(orderedSections);
        console.log(groupedSections);
        // Set initial draft content if there are sections
        const firstType = Object.keys(orderedSections)[0];
        if (firstType && orderedSections[firstType].length) {
          setDraftContent(orderedSections[firstType][0].content);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchSections();
  }, [id]);

  const goToIndex = (idx: number) => {
    setCurrentIndex(idx);
    const sectionType = Object.keys(sections)[idx];
    setDraftContent(sections[sectionType][0].content);
  };

  const handlePrevious = () => currentIndex > 0 && goToIndex(currentIndex - 1);
  const handleNext = () =>
    currentIndex < Object.keys(sections).length - 1
      ? goToIndex(currentIndex + 1)
      : router.push(`/resume/${id}/review`);

  if (isLoading) {
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

  if (!Object.keys(sections).length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">No sections found.</p>
      </div>
    );
  }

  const sectionTypes = Object.keys(sections);
  const currentSectionType = Object.keys(sections)[currentIndex];
  const current = sections[currentSectionType];
  console.log(sectionTypes,"current");
  const CurrentSectionComponent = sectionComponents[current[0].type.toLowerCase() as keyof typeof sectionComponents];
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Centered, pill-style section nav */}
        <div className="flex justify-center space-x-3 overflow-x-auto mb-8">
          {sectionTypes.map((type, idx) => (
            <button
              key={type}
              onClick={() => goToIndex(idx)}
              className={`
                whitespace-nowrap
                px-4 py-2
                rounded-full
                text-sm font-medium
                transition-all duration-150
                ${idx === currentIndex
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6">
            {current[0].type.charAt(0).toUpperCase() + current[0].type.slice(1)}
          </h1>

          {CurrentSectionComponent && (
            <CurrentSectionComponent
              data={current as any}
              onChange={(field, value) => {
                const updatedSections = { ...sections };
                const sectionToUpdate = { ...current[currentIndex], [field]: value };
                updatedSections[currentSectionType][currentIndex] = sectionToUpdate;
                setSections(updatedSections);
              }}
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
              className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              {currentIndex === Object.keys(sections).length - 1 ? 'Review' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
