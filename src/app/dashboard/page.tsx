import { getSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { FaPlus, FaFileAlt, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Link from 'next/link';
import { Database } from '@/types/supabase';

type TailoringData = Database['public']['Tables']['tailoring_data']['Row'];

async function getResumes() {
  const supabase = getSupabaseServerClient();
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  console.log("Session data:12", session);
  if (sessionError || !session) {
    redirect('/login');
  }
  console.log("Session data:13", session);
  const { data, error } = await supabase
    .from('tailoring_data')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching resumes:', error);
    return [];
  }
  console.log("Session data:14", data);
  return data || [];
}

export default async function DashboardPage() {
  const resumes = await getResumes();

  return (
    <div className="min-h-screen bg-[#181828] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">My Resumes</h1>
          <Link
            href="/tailor"
            className="btn-primary"
          >
            <FaPlus className="w-4 h-4 mr-2" />
            Create New Resume
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-12">
            <FaFileAlt className="mx-auto h-12 w-12 text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-100">No resumes</h3>
            <p className="mt-1 text-sm text-gray-400">Get started by creating a new resume.</p>
            <div className="mt-6">
              <Link
                href="/tailor"
                className="btn-primary"
              >
                <FaPlus className="w-4 h-4 mr-2" />
                Create New Resume
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-[#232336] overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-100 truncate">
                      {resume.resume_path.split('/').pop()?.replace('.pdf', '') || 'Untitled Resume'}
                    </h3>
                    <div className="flex space-x-2">
                      <Link
                        href={`/resume/${resume.id}/preview`}
                        className="btn-primary"
                        title="Preview"
                      >
                        <FaEye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/resume/${resume.id}`}
                        className="btn-primary"
                        title="Edit"
                      >
                        <FaEdit className="w-4 h-4" />
                      </Link>
                      <form
                        action={async () => {
                          'use server';
                          const supabase = getSupabaseServerClient();
                          await supabase
                            .from('tailoring_data')
                            .delete()
                            .eq('id', resume.id);
                          redirect('/dashboard');
                        }}
                      >
                        <button
                          type="submit"
                          className="btn-primary hover:bg-red-700 hover:border-red-500"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">
                    Created: {new Date(resume.created_at).toLocaleDateString()}
                  </p>
                  {resume.job_description && (
                    <p className="mt-2 text-sm text-gray-300 line-clamp-2">
                      {resume.job_description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 