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
    school: string;
    degree: string;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
  }
  export interface Certification { 
    id: string;
    name: string;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
  }
  export interface Project { 
    id: string;
    name: string;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
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
  }
  