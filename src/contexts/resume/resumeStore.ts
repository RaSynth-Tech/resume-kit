import { create } from 'zustand';
import { ResumeData, Profile, Experience, Education, Certification, Project, Affiliations, Awards, Conferences, Interests, Languages, Publications, ApiResponse, Section } from '@/types/resume';

interface ResumeState {
    // Resume data
    resumeData: Record<string, ResumeData> | null;
    loading: boolean;
    error: string | null;
    currentResumeId: string | null;

    // Actions
    setResumeData: (data: Record<string, ResumeData> | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setCurrentResumeId: (id: string | null) => void;

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
    resumeData: {},
    loading: false,
    error: null,
    currentResumeId: null,

    setResumeData: (data) => set({ resumeData: data }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setCurrentResumeId: (id) => set({ currentResumeId: id }),

    // Profile actions
    updateProfile: (profile) => {
        set((state) => {
            if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
                return state;
            }
            const currentResume = state.resumeData[state.currentResumeId];
            if (!currentResume.profile || currentResume.profile.length === 0) {
                console.warn("Profile section or profile item missing for current resume.");
                return state;
            }
            const currentProfile = currentResume.profile[0];
            return {
                resumeData: {
                    ...state.resumeData,
                    [state.currentResumeId]: {
                        ...currentResume,
                        profile: [{
                            ...currentProfile,
                            ...profile
                        }]
                    }
                }
            };
        });
    },

    // Experience actions
    addExperience: (experience: Experience) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    experiences: [...(currentResume.experiences || []), experience]
                }
            }
        };
    }),
    updateExperience: (id: string, experience: Partial<Experience>) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    experiences: (currentResume.experiences || []).map((exp: Experience) =>
                        exp.id === id ? { ...exp, ...experience } : exp
                    )
                }
            }
        };
    }),
    removeExperience: (id: string) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    experiences: (currentResume.experiences || []).filter((exp: Experience) => exp.id !== id)
                }
            }
        };
    }),

    // Education actions
    addEducation: (education: Education) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    education: [...(currentResume.education || []), education]
                }
            }
        };
    }),
    updateEducation: (id: string, education: Partial<Education>) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    education: (currentResume.education || []).map((edu: Education) =>
                        edu.id === id ? { ...edu, ...education } : edu
                    )
                }
            }
        };
    }),
    removeEducation: (id: string) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    education: (currentResume.education || []).filter((edu: Education) => edu.id !== id)
                }
            }
        };
    }),

    // Certification actions
    addCertification: (certification: Certification) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    certifications: [...(currentResume.certifications || []), certification]
                }
            }
        };
    }),
    updateCertification: (id: string, certification: Partial<Certification>) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    certifications: (currentResume.certifications || []).map((cert: Certification) =>
                        cert.id === id ? { ...cert, ...certification } : cert
                    )
                }
            }
        };
    }),
    removeCertification: (id: string) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    certifications: (currentResume.certifications || []).filter((cert: Certification) => cert.id !== id)
                }
            }
        };
    }),

    // Project actions
    addProject: (project: Project) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    projects: [...(currentResume.projects || []), project]
                }
            }
        };
    }),
    updateProject: (id: string, project: Partial<Project>) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    projects: (currentResume.projects || []).map((proj: Project) =>
                        proj.id === id ? { ...proj, ...project } : proj
                    )
                }
            }
        };
    }),
    removeProject: (id: string) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    projects: (currentResume.projects || []).filter((proj: Project) => proj.id !== id)
                }
            }
        };
    }),

    // Affiliation actions
    addAffiliation: (affiliation: Affiliations) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    affiliations: [...(currentResume.affiliations || []), affiliation]
                }
            }
        };
    }),
    updateAffiliation: (id: string, affiliation: Partial<Affiliations>) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    affiliations: (currentResume.affiliations || []).map((aff: Affiliations) =>
                        aff.id === id ? { ...aff, ...affiliation } : aff
                    )
                }
            }
        };
    }),
    removeAffiliation: (id: string) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    affiliations: (currentResume.affiliations || []).filter((aff: Affiliations) => aff.id !== id)
                }
            }
        };
    }),

    // Award actions
    addAward: (award: Awards) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    awards: [...(currentResume.awards || []), award]
                }
            }
        };
    }),
    updateAward: (id: string, award: Partial<Awards>) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    awards: (currentResume.awards || []).map((a: Awards) =>
                        a.id === id ? { ...a, ...award } : a
                    )
                }
            }
        };
    }),
    removeAward: (id: string) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    awards: (currentResume.awards || []).filter((a: Awards) => a.id !== id)
                }
            }
        };
    }),

    // Conference actions
    addConference: (conference: Conferences) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    conferences: [...(currentResume.conferences || []), conference]
                }
            }
        };
    }),
    updateConference: (id: string, conference: Partial<Conferences>) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    conferences: (currentResume.conferences || []).map((c: Conferences) =>
                        c.id === id ? { ...c, ...conference } : c
                    )
                }
            }
        };
    }),
    removeConference: (id: string) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    conferences: (currentResume.conferences || []).filter((c: Conferences) => c.id !== id)
                }
            }
        };
    }),

    // Interest actions
    addInterest: (interest: Interests) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    interests: [...(currentResume.interests || []), interest]
                }
            }
        };
    }),
    updateInterest: (id: string, interest: Partial<Interests>) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    interests: (currentResume.interests || []).map((i: Interests) =>
                        i.id === id ? { ...i, ...interest } : i
                    )
                }
            }
        };
    }),
    removeInterest: (id: string) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    interests: (currentResume.interests || []).filter((i: Interests) => i.id !== id)
                }
            }
        };
    }),

    // Language actions
    addLanguage: (language: Languages) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    languages: [...(currentResume.languages || []), language]
                }
            }
        };
    }),
    updateLanguage: (id: string, language: Partial<Languages>) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    languages: (currentResume.languages || []).map((l: Languages) =>
                        l.id === id ? { ...l, ...language } : l
                    )
                }
            }
        };
    }),
    removeLanguage: (id: string) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    languages: (currentResume.languages || []).filter((l: Languages) => l.id !== id)
                }
            }
        };
    }),

    // Publication actions
    addPublication: (publication: Publications) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    publications: [...(currentResume.publications || []), publication]
                }
            }
        };
    }),
    updatePublication: (id: string, publication: Partial<Publications>) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    publications: (currentResume.publications || []).map((p: Publications) =>
                        p.id === id ? { ...p, ...publication } : p
                    )
                }
            }
        };
    }),
    removePublication: (id: string) => set((state) => {
        if (!state.currentResumeId || !state.resumeData || !state.resumeData[state.currentResumeId]) {
            return state;
        }
        const currentResume = state.resumeData[state.currentResumeId];
        return {
            resumeData: {
                ...state.resumeData,
                [state.currentResumeId]: {
                    ...currentResume,
                    publications: (currentResume.publications || []).filter((p: Publications) => p.id !== id)
                }
            }
        };
    }),

    // API actions
    fetchResume: async (id: string) => {
        console.log("fetching resume for id:", id);
        try {
            set({ loading: true, error: null });
            const response = await fetch(`/api/resume/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch resume: ${response.status} ${response.statusText}`);
            }
            const data: ApiResponse[] = await response.json();
            console.log("Raw data received:", data);

            if (data && data.length > 0) {
                console.log("Processing and setting resume data for id:", id);
                
                const initialGroupedData: ResumeData = {
                    profile: [], experiences: [], education: [], certifications: [],
                    projects: [], affiliations: [], awards: [], conferences: [],
                    interests: [], languages: [], publications: [],
                };

                const groupedData = data.reduce((acc, item: ApiResponse) => {
                    let rawTitle: string | undefined;
                    if (Array.isArray(item.section_title)) {
                        rawTitle = item.section_title[0] as unknown as string;
                    } else {
                        rawTitle = item.section_title as unknown as string;
                    }

                    const sectionKey = (rawTitle === 'resume_profiles' ? 'profile' : rawTitle);

                    if (typeof sectionKey === 'string' && sectionKey && sectionKey in acc) {
                        (acc[sectionKey as keyof ResumeData] as any[]).push(item as any);
                    } else {
                        console.warn(`Unknown or invalid section title encountered: ${sectionKey} (original: ${JSON.stringify(item.section_title)})`);
                    }
                    return acc;
                }, initialGroupedData);
                
                console.log("Grouped data for id:", id, groupedData);
                set((state) => ({
                    resumeData: {
                        ...(state.resumeData || {}),
                        [id]: groupedData, 
                    },
                    currentResumeId: id,
                    loading: false,
                    error: null
                }));
            } else {
                console.log("No data found for resume id:", id);
                set((state) => ({
                    resumeData: {
                        ...(state.resumeData || {}),
                        [id]: { 
                            profile: [], experiences: [], education: [], certifications: [],
                            projects: [], affiliations: [], awards: [], conferences: [],
                            interests: [], languages: [], publications: [],
                        } as ResumeData, 
                    },
                    currentResumeId: id, 
                    loading: false,
                    error: 'No data found for this resume.'
                }));
            }

        } catch (err) {
            console.error("Error fetching resume for id:", id, err); 
            set({ 
                error: err instanceof Error ? err.message : 'Failed to fetch resume', 
                loading: false,
            });
        }
    },

    saveResume: async () => {
        const { resumeData, currentResumeId } = get();
        if (!currentResumeId || !resumeData || !resumeData[currentResumeId]) {
            console.error("No current resume selected or no data to save.");
            return;
        }
        const currentResume = resumeData[currentResumeId];

        try {
            // set({ loading: true, error: null });
            const response = await fetch(`/api/resume/${currentResumeId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentResume),
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