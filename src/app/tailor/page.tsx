'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TailoringForm from '@/components/resume/TailoringForm';
import { TailoringFormData } from '@/types';

export default function TailorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: TailoringFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // The form submission is now handled by the API route
      // We just need to handle the response and redirect
      router.push('/kit');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#181828] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#232336] rounded-lg shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-100 mb-6">
            Tailor Your Resume
          </h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <TailoringForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
} 