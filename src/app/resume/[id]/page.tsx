'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Section {
  id: string;
  type: string;
  content: string;
  sort_index: number;
}

interface ApiResponse {
  sections: Section[];
}

export default function ResumeSectionEditor() {
  const router = useRouter();
  const params = useParams();
  const [sections, setSections] = useState<Section[]>([]);
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
        setSections(data.sections);
        if (data.sections.length) {
          setDraftContent(data.sections[0].content);
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
    setDraftContent(sections[idx].content);
  };

  const handlePrevious = () => currentIndex > 0 && goToIndex(currentIndex - 1);
  const handleNext = () =>
    currentIndex < sections.length - 1
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

  if (!sections.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">No sections found.</p>
      </div>
    );
  }

  const current = sections[currentIndex];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Centered, pill-style section nav */}
        <div className="flex justify-center space-x-3 overflow-x-auto mb-8">
          {sections.map((sec, idx) => (
            <button
              key={sec.id}
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
              {sec.type.charAt(0).toUpperCase() + sec.type.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6">
            {current.type.charAt(0).toUpperCase() + current.type.slice(1)}
          </h1>

          <div className="grid grid-cols-[1fr_1.5fr] gap-8">
            {/* Original content */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Original Content</h2>
              <div className="prose whitespace-pre-wrap text-gray-800">
                {current.content}
              </div>
            </div>

            {/* Draft content */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Draft Content</h2>
              <textarea
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                className="w-full h-64 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Edit the draft content here..."
              />
            </div>
          </div>

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
              {currentIndex === sections.length - 1 ? 'Review' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
