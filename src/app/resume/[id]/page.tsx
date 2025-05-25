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
  const [sections, setSections] = useState<Record<string, Section[]>>({
    profile: [],
    experiences: [],
    education: [],
    certifications: [],
    projects: [],
    interests: [],
    languages: [],
    affiliations: [],
    awards: [],
    publications: [],
    conferences: []
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draftContent, setDraftContent] = useState('');

  const id = params?.id as string;

  const handleSectionChange = (fieldOrIndex: string | number, valueOrField?: any, value?: any) => {
    setSections(prevSections => {
      const updatedSections = { ...prevSections };
      const currentSectionType = Object.keys(prevSections)[currentIndex];
      
      if (!updatedSections[currentSectionType]) {
        return prevSections;
      }

      // Handle both function signatures
      const field = typeof fieldOrIndex === 'number' ? valueOrField : fieldOrIndex;
      const newValue = typeof fieldOrIndex === 'number' ? value : valueOrField;
      const index = typeof fieldOrIndex === 'number' ? fieldOrIndex : 0;

      // Update the specific section at the given index
      const updatedSectionArray = [...updatedSections[currentSectionType]];
      updatedSectionArray[index] = {
        ...updatedSectionArray[index],
        [field]: newValue
      };

      updatedSections[currentSectionType] = updatedSectionArray;
      return updatedSections;
    });
  };

  useEffect(() => {
    const fetchSections = async () => {
      if (!id) return;
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/resume/${id}/sections`);
        if (!res.ok) throw new Error('Failed to fetch sections');
        const data: ApiResponse = await res.json();

        // Initialize with empty arrays for all section types
        const initialSections: Record<string, Section[]> = {
          profile: [],
          experiences: [],
          education: [],
          certifications: [],
          projects: [],
          interests: [],
          languages: [],
          affiliations: [],
          awards: [],
          publications: [],
          conferences: []
        };

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
        }, initialSections);

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
          acc[type] = groupedSections[type] || [];
          return acc;
        }, {} as Record<string, Section[]>);

        setSections(orderedSections);
        
        // Set initial draft content if there are sections
        const firstType = Object.keys(orderedSections)[0];
        if (firstType && orderedSections[firstType].length > 0) {
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

  const sectionTypes = Object.keys(sections).filter(type => sections[type].length > 0);
  const currentSectionType = sectionTypes[currentIndex];
  const current = sections[currentSectionType] || [];
  const CurrentSectionComponent = current.length > 0 
    ? sectionComponents[current[0].type.toLowerCase() as keyof typeof sectionComponents]
    : null;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {sectionTypes.length > 0 && (
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
