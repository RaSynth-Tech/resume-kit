'use client';

import { useState } from 'react';
import { TailoringResult } from '@/types';

export default function KitPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<TailoringResult>({
    summary: "Experienced software engineer with a strong background in full-stack development...",
    bulletPoints: [
      "Led development of key features resulting in 30% user growth",
      "Optimized database queries improving performance by 50%",
      "Mentored junior developers and conducted code reviews",
      "Implemented CI/CD pipeline reducing deployment time by 40%"
    ]
  });

  const handleDownload = () => {
    // TODO: Implement Razorpay payment flow
    alert('Payment required to download PDF');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Tailored Resume</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Job Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  Senior Software Engineer position requiring 5+ years of experience in full-stack development...
                </p>
              </div>
            </div>

            {/* Tailored Content */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Tailored Content</h2>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Summary
                    </label>
                    <textarea
                      className="input-field h-32"
                      value={editedContent.summary}
                      onChange={(e) => setEditedContent({
                        ...editedContent,
                        summary: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Points
                    </label>
                    {editedContent.bulletPoints.map((point, index) => (
                      <input
                        key={index}
                        type="text"
                        className="input-field mb-2"
                        value={point}
                        onChange={(e) => {
                          const newPoints = [...editedContent.bulletPoints];
                          newPoints[index] = e.target.value;
                          setEditedContent({
                            ...editedContent,
                            bulletPoints: newPoints
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-700">{editedContent.summary}</p>
                  <ul className="list-disc list-inside space-y-2">
                    {editedContent.bulletPoints.map((point, index) => (
                      <li key={index} className="text-gray-700">{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleDownload}
              className="btn-primary"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 