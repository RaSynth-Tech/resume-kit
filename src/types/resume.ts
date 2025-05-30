/* --------------------------------------------------------------------------
 * Primitive value objects
 * -------------------------------------------------------------------------- */
export interface Profile {
    id: string;
    full_name: string;
    job_title: string;
    phone: string | null;
    email: string | null;
    location: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    website_url: string | null;
    about_me: string | null;
  }
  
  export interface Experience {
    id: string;
    company: string;
    title: string;
    start_date: string | null;
    end_date: string | null;
    bullets: string[];
  }
  
  export interface Education { 
    id: string;
    institution: string;
    degree: string;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
    sort_index: number;
  }
  export interface Certification { 
    id: string;
    name: string;
    issuer: string | null;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
    sort_index: number;
  }
  export interface Project { 
    id: string;
    name: string;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
    url: string | null;
    github_url: string | null;
    bullets: string[];
    sort_index: number;
  }
  
  export interface Affiliations {
    id: string;
    organization: string;
    role: string | null;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
    sort_index: number;
  }
  
  export interface Awards {
    id: string;
    title: string;
    issuer: string | null;
    date_awarded: string;
    description: string | null;
    sort_index: number;
  }
  
  export interface Conferences {
    id: string;
    name: string;
    date: string | null;
    role: string | null;
    topic: string | null;
    link: string | null;
    sort_index: number;
  }
  
  export interface Interests {
    id: string;
    interest: string;
    sort_index: number;
  }
  
  export interface Languages {
    id: string;
    language: string;
    proficiency: string | null;
    sort_index: number;
  }
  
  export interface Publications {
    id: string;
    title: string;
    co_authors: string[] | null;
    date_published: string | null;
    venue: string | null;
    link: string | null;
    sort_index: number;
  }
  
  /* --------------------------------------------------------------------------
   * Aggregated shape straight from your DB / API
   * -------------------------------------------------------------------------- */
  export interface ResumeData {
    profile:        Profile[];       // there is exactly one, but keep the array
    experiences:    Experience[];
    education:      Education[];
    certifications: Certification[];
    projects:       Project[];
    affiliations:   Affiliations[];
    awards:         Awards[];
    conferences:    Conferences[];
    interests:      Interests[];
    languages:      Languages[];
    publications:   Publications[];
  }
  

  export interface Section {
    id: string;
    type: string;
    content: string;
    sort_index: number;
  }
  
  export interface ApiResponse {
    [key: string]: Section[];
  }