'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TailoringForm from '@/components/TailoringForm';
import OutputBox from '@/components/OutputBox';
import { TailoringFormData, TailoringResult } from '@/types';

export default function TailorPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TailoringResult | null>(null);

  const handleSubmit = async (data: TailoringFormData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual OpenAI API call
      const mockResult: TailoringResult = {
        summary: "Experienced software engineer with a strong background in full-stack development...",
        bulletPoints: [
          "Led development of key features resulting in 30% user growth",
          "Optimized database queries improving performance by 50%",
          "Mentored junior developers and conducted code reviews",
          "Implemented CI/CD pipeline reducing deployment time by 40%"
        ]
      };
      
      setResult(mockResult);
    } catch (error) {
      console.error('Error generating tailored resume:', error);
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      const text = `${result.summary}\n\n${result.bulletPoints.join('\n')}`;
      navigator.clipboard.writeText(text);
    }
  };

  const handleNext = () => {
    router.push('/kit');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Tailor Your Resume</h1>
          
          {!result ? (
            <TailoringForm onSubmit={handleSubmit} isLoading={isLoading} />
          ) : (
            <OutputBox
              result={result}
              onCopy={handleCopy}
              onNext={handleNext}
            />
          )}
        </div>
      </div>
    </main>
  );
} 