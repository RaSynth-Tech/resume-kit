import { useState, useRef } from 'react';
import { TailoringFormData } from '@/types';

interface TailoringFormProps {
  onSubmit: (data: TailoringFormData) => void;
  isLoading?: boolean;
}

export default function TailoringForm({ onSubmit, isLoading = false }: TailoringFormProps) {
  const [formData, setFormData] = useState<TailoringFormData>({
    resume: '',
    jobDescription: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeFile(file);
        // TODO: Implement file reading logic here
        // For now, we'll just set the filename as the resume content
        setFormData({ ...formData, resume: file.name });
      } else {
        alert('Please upload a PDF or DOCX file');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
          Your Resume
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="resume-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
              >
                <span>Upload a file</span>
                <input
                  id="resume-upload"
                  name="resume-upload"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PDF or DOCX up to 10MB</p>
          </div>
        </div>
        {resumeFile && (
          <p className="mt-2 text-sm text-gray-500">
            Selected file: {resumeFile.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          className="input-field h-48"
          value={formData.jobDescription}
          onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
          placeholder="Paste the job description here..."
          required
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full"
        disabled={isLoading || !resumeFile}
      >
        {isLoading ? 'Generating...' : 'Generate Tailored Resume'}
      </button>
    </form>
  );
} 