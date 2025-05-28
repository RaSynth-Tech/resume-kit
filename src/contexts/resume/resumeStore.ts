import { create } from 'zustand';
import { ResumeData, Profile, Experience, Education, Certification, Project, ApiResponse, Section } from '@/types/resume';

interface ResumeState {
    // Resume data
    resumeData: ResumeData | null;
    loading: boolean;
    error: string | null;

    // Actions
    setResumeData: (data: ResumeData | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    // Profile actions
    updateProfile: (profile: Profile) => void;

    // Experience actions
    addExperience: (experience: Experience) => void;
    updateExperience: (id: string, experience: Partial<Experience>) => void;
    removeExperience: (id: string) => void;

    // Education actions
    addEducation: (education: Education) => void;
    updateEducation: (id: string, education: Partial<Education>) => void;
    removeEducation: (id: string) => void;

    // Certification actions
    addCertification: (certification: Certification) => void;
    updateCertification: (id: string, certification: Partial<Certification>) => void;
    removeCertification: (id: string) => void;

    // Project actions
    addProject: (project: Project) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    removeProject: (id: string) => void;

    // API actions
    fetchResume: (id: string) => Promise<void>;
    saveResume: () => Promise<void>;
}

export const useResumeStore = create<ResumeState>((set, get) => ({
    resumeData: null,
    loading: false,
    error: null,

    setResumeData: (data) => set({ resumeData: data }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    // Profile actions
    updateProfile: (profile) => {
        set((state) => {
            if (!state.resumeData) return state;
            const currentProfile = state.resumeData.profile[0];
            return {
                resumeData: {
                    ...state.resumeData,
                    profile: [{
                        ...currentProfile,
                        ...profile
                    }]
                }
            };
        });
    },

    // Experience actions
    addExperience: (experience) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            experiences: [...state.resumeData.experiences, experience]
        } : null
    })),
    updateExperience: (id, experience) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            experiences: state.resumeData.experiences.map(exp =>
                exp.id === id ? { ...exp, ...experience } : exp
            )
        } : null
    })),
    removeExperience: (id) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            experiences: state.resumeData.experiences.filter(exp => exp.id !== id)
        } : null
    })),

    // Education actions
    addEducation: (education) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            education: [...state.resumeData.education, education]
        } : null
    })),
    updateEducation: (id, education) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            education: state.resumeData.education.map(edu =>
                edu.id === id ? { ...edu, ...education } : edu
            )
        } : null
    })),
    removeEducation: (id) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            education: state.resumeData.education.filter(edu => edu.id !== id)
        } : null
    })),

    // Certification actions
    addCertification: (certification) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            certifications: [...state.resumeData.certifications, certification]
        } : null
    })),
    updateCertification: (id, certification) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            certifications: state.resumeData.certifications.map(cert =>
                cert.id === id ? { ...cert, ...certification } : cert
            )
        } : null
    })),
    removeCertification: (id) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            certifications: state.resumeData.certifications.filter(cert => cert.id !== id)
        } : null
    })),

    // Project actions
    addProject: (project) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            projects: [...state.resumeData.projects, project]
        } : null
    })),
    updateProject: (id, project) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            projects: state.resumeData.projects.map(proj =>
                proj.id === id ? { ...proj, ...project } : proj
            )
        } : null
    })),
    removeProject: (id) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            projects: state.resumeData.projects.filter(proj => proj.id !== id)
        } : null
    })),

    // API actions
    fetchResume: async (id: string) => {
        console.log("fetching resume");
        try {
            set({ loading: true, error: null });
            const response = await fetch(`/api/resume/${id}`);
            const data = await response.json();
            console.log(data);
            if (data.length > 0) {
                console.log("setting resume data");
                const groupedData = data.reduce((acc: Record<string, any[]>, item: any) => {
                    // Create an array for each section if it doesn't exist
                    const sectionTitle = item.section_title === 'resume_profiles' ? 'profile' : item.section_title;
                    if (!acc[sectionTitle]) {
                        acc[sectionTitle] = [];  // Initialize an empty array for this section
                    }
                    acc[sectionTitle].push(item);
                    return acc;
                }, {} as Record<string, any[]>);
                console.log(groupedData);
                set({ resumeData: groupedData });
            }
            
            console.log(data);

        } catch (err) {
            set({ error: err instanceof Error ? err.message : 'Failed to fetch resume' });
        } finally {
            set({ loading: false });
        }
    },

    saveResume: async () => {
        const { resumeData } = get();
        if (!resumeData) return;

        try {
            set({ loading: true, error: null });
            const response = await fetch('/api/resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resumeData),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to save resume');
            }
        } catch (err) {
            set({ error: err instanceof Error ? err.message : 'Failed to save resume' });
            throw err;
        } finally {
            set({ loading: false });
        }
    },
})); 