import { create } from 'zustand';
import { ResumeData, Profile, Experience, Education, Certification, Project, Affiliations, Awards, Conferences, Interests, Languages, Publications, ApiResponse, Section } from '@/types/resume';

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

    // Affiliation actions
    addAffiliation: (affiliation: Affiliations) => void;
    updateAffiliation: (id: string, affiliation: Partial<Affiliations>) => void;
    removeAffiliation: (id: string) => void;

    // Award actions
    addAward: (award: Awards) => void;
    updateAward: (id: string, award: Partial<Awards>) => void;
    removeAward: (id: string) => void;

    // Conference actions
    addConference: (conference: Conferences) => void;
    updateConference: (id: string, conference: Partial<Conferences>) => void;
    removeConference: (id: string) => void;

    // Interest actions
    addInterest: (interest: Interests) => void;
    updateInterest: (id: string, interest: Partial<Interests>) => void;
    removeInterest: (id: string) => void;

    // Language actions
    addLanguage: (language: Languages) => void;
    updateLanguage: (id: string, language: Partial<Languages>) => void;
    removeLanguage: (id: string) => void;

    // Publication actions
    addPublication: (publication: Publications) => void;
    updatePublication: (id: string, publication: Partial<Publications>) => void;
    removePublication: (id: string) => void;

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

    // Affiliation actions
    addAffiliation: (affiliation) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            affiliations: [...state.resumeData.affiliations, affiliation]
        } : null
    })),
    updateAffiliation: (id, affiliation) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            affiliations: state.resumeData.affiliations.map(aff =>
                aff.id === id ? { ...aff, ...affiliation } : aff
            )
        } : null
    })),
    removeAffiliation: (id) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            affiliations: state.resumeData.affiliations.filter(aff => aff.id !== id)
        } : null
    })),

    // Award actions
    addAward: (award) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            awards: [...state.resumeData.awards, award]
        } : null
    })),
    updateAward: (id, award) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            awards: state.resumeData.awards.map(a =>
                a.id === id ? { ...a, ...award } : a
            )
        } : null
    })),
    removeAward: (id) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            awards: state.resumeData.awards.filter(a => a.id !== id)
        } : null
    })),

    // Conference actions
    addConference: (conference) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            conferences: [...state.resumeData.conferences, conference]
        } : null
    })),
    updateConference: (id, conference) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            conferences: state.resumeData.conferences.map(c =>
                c.id === id ? { ...c, ...conference } : c
            )
        } : null
    })),
    removeConference: (id) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            conferences: state.resumeData.conferences.filter(c => c.id !== id)
        } : null
    })),

    // Interest actions
    addInterest: (interest) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            interests: [...state.resumeData.interests, interest]
        } : null
    })),
    updateInterest: (id, interest) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            interests: state.resumeData.interests.map(i =>
                i.id === id ? { ...i, ...interest } : i
            )
        } : null
    })),
    removeInterest: (id) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            interests: state.resumeData.interests.filter(i => i.id !== id)
        } : null
    })),

    // Language actions
    addLanguage: (language) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            languages: [...state.resumeData.languages, language]
        } : null
    })),
    updateLanguage: (id, language) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            languages: state.resumeData.languages.map(l =>
                l.id === id ? { ...l, ...language } : l
            )
        } : null
    })),
    removeLanguage: (id) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            languages: state.resumeData.languages.filter(l => l.id !== id)
        } : null
    })),

    // Publication actions
    addPublication: (publication) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            publications: [...state.resumeData.publications, publication]
        } : null
    })),
    updatePublication: (id, publication) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            publications: state.resumeData.publications.map(p =>
                p.id === id ? { ...p, ...publication } : p
            )
        } : null
    })),
    removePublication: (id) => set((state) => ({
        resumeData: state.resumeData ? {
            ...state.resumeData,
            publications: state.resumeData.publications.filter(p => p.id !== id)
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