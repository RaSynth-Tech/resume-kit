import { useState, useRef } from 'react';
import { TailoringFormData, FormErrors } from '@/types';

interface TailoringFormProps {
  onSubmit: (data: TailoringFormData) => void;
  isLoading?: boolean;
}

export default function TailoringForm({ onSubmit, isLoading = false }: TailoringFormProps) {
  const [formData, setFormData] = useState<TailoringFormData>({
    email: '',
    jobDescription: '',
    resumeFile: null
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.jobDescription) {
      newErrors.jobDescription = 'Job description is required';
    }
    
    if (!formData.resumeFile) {
      newErrors.resumeFile = 'Resume file is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('jobDescription', formData.jobDescription);
      if (formData.resumeFile) {
        formDataToSend.append('resumeFile', formData.resumeFile);
      }

      const response = await fetch('/api/tailor', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      onSubmit(formData);
    } catch (error) {
      setErrors({
        ...errors,
        submit: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          setErrors({ ...errors, resumeFile: 'File size must be less than 10MB' });
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          return;
        }
        setFormData({ ...formData, resumeFile: file });
        setErrors({ ...errors, resumeFile: undefined });
      } else {
        setErrors({ ...errors, resumeFile: 'Please upload a PDF or DOCX file' });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className={`input-field ${errors.email ? 'border-red-500' : ''}`}
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            setErrors({ ...errors, email: undefined });
          }}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          className={`input-field h-48 ${errors.jobDescription ? 'border-red-500' : ''}`}
          value={formData.jobDescription}
          onChange={(e) => {
            setFormData({ ...formData, jobDescription: e.target.value });
            setErrors({ ...errors, jobDescription: undefined });
          }}
          placeholder="Paste the job description here..."
        />
        {errors.jobDescription && (
          <p className="mt-1 text-sm text-red-600">{errors.jobDescription}</p>
        )}
      </div>

      <div>
        <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
          Your Resume
        </label>
        <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.resumeFile ? 'border-red-500' : 'border-gray-300'} border-dashed rounded-lg`}>
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
        {errors.resumeFile && (
          <p className="mt-1 text-sm text-red-600">{errors.resumeFile}</p>
        )}
        {formData.resumeFile && (
          <p className="mt-2 text-sm text-gray-500">
            Selected file: {formData.resumeFile.name}
          </p>
        )}
      </div>

      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <button
        type="submit"
        className="btn-primary w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Generate Tailored Resume'}
      </button>
    </form>
  );
} 