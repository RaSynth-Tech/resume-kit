export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      affiliations: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          organization: string
          role: string | null
          sort_index: number
          start_date: string | null
          tailoring_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          organization: string
          role?: string | null
          sort_index: number
          start_date?: string | null
          tailoring_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          organization?: string
          role?: string | null
          sort_index?: number
          start_date?: string | null
          tailoring_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliations_tailoring_id_fkey"
            columns: ["tailoring_id"]
            isOneToOne: false
            referencedRelation: "tailoring_data"
            referencedColumns: ["id"]
          },
        ]
      }
      awards: {
        Row: {
          created_at: string
          date_awarded: string
          description: string | null
          id: string
          issuer: string | null
          sort_index: number
          tailoring_id: string
          title: string
        }
        Insert: {
          created_at?: string
          date_awarded: string
          description?: string | null
          id?: string
          issuer?: string | null
          sort_index: number
          tailoring_id: string
          title: string
        }
        Update: {
          created_at?: string
          date_awarded?: string
          description?: string | null
          id?: string
          issuer?: string | null
          sort_index?: number
          tailoring_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "awards_tailoring_id_fkey"
            columns: ["tailoring_id"]
            isOneToOne: false
            referencedRelation: "tailoring_data"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          created_at: string
          date_earned: string
          expiration_date: string | null
          id: string
          issuer: string
          name: string
          sort_index: number
          tailoring_id: string
        }
        Insert: {
          created_at?: string
          date_earned: string
          expiration_date?: string | null
          id?: string
          issuer: string
          name: string
          sort_index: number
          tailoring_id: string
        }
        Update: {
          created_at?: string
          date_earned?: string
          expiration_date?: string | null
          id?: string
          issuer?: string
          name?: string
          sort_index?: number
          tailoring_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certifications_tailoring_id_fkey"
            columns: ["tailoring_id"]
            isOneToOne: false
            referencedRelation: "tailoring_data"
            referencedColumns: ["id"]
          },
        ]
      }
      conferences: {
        Row: {
          created_at: string
          date: string | null
          id: string
          link: string | null
          name: string
          role: string | null
          sort_index: number
          tailoring_id: string
          topic: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: string
          link?: string | null
          name: string
          role?: string | null
          sort_index: number
          tailoring_id: string
          topic?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: string
          link?: string | null
          name?: string
          role?: string | null
          sort_index?: number
          tailoring_id?: string
          topic?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conferences_tailoring_id_fkey"
            columns: ["tailoring_id"]
            isOneToOne: false
            referencedRelation: "tailoring_data"
            referencedColumns: ["id"]
          },
        ]
      }
      education: {
        Row: {
          coursework: string[] | null
          created_at: string
          degree: string
          end_date: string | null
          gpa: number | null
          id: string
          institution: string
          location: string | null
          sort_index: number
          start_date: string | null
          tailoring_id: string
        }
        Insert: {
          coursework?: string[] | null
          created_at?: string
          degree: string
          end_date?: string | null
          gpa?: number | null
          id?: string
          institution: string
          location?: string | null
          sort_index: number
          start_date?: string | null
          tailoring_id: string
        }
        Update: {
          coursework?: string[] | null
          created_at?: string
          degree?: string
          end_date?: string | null
          gpa?: number | null
          id?: string
          institution?: string
          location?: string | null
          sort_index?: number
          start_date?: string | null
          tailoring_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_tailoring_id_fkey"
            columns: ["tailoring_id"]
            isOneToOne: false
            referencedRelation: "tailoring_data"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          bullets: string[]
          company: string
          created_at: string
          end_date: string | null
          id: string
          sort_index: number
          start_date: string
          tailoring_id: string
          title: string
        }
        Insert: {
          bullets?: string[]
          company: string
          created_at?: string
          end_date?: string | null
          id?: string
          sort_index: number
          start_date: string
          tailoring_id: string
          title: string
        }
        Update: {
          bullets?: string[]
          company?: string
          created_at?: string
          end_date?: string | null
          id?: string
          sort_index?: number
          start_date?: string
          tailoring_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "experiences_tailoring_id_fkey"
            columns: ["tailoring_id"]
            isOneToOne: false
            referencedRelation: "tailoring_data"
            referencedColumns: ["id"]
          },
        ]
      }
      interests: {
        Row: {
          created_at: string
          id: string
          interest: string
          sort_index: number
          tailoring_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          interest: string
          sort_index: number
          tailoring_id: string
        }
        Update: {
          created_at?: string
          id?: string
          interest?: string
          sort_index?: number
          tailoring_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interests_tailoring_id_fkey"
            columns: ["tailoring_id"]
            isOneToOne: false
            referencedRelation: "tailoring_data"
            referencedColumns: ["id"]
          },
        ]
      }
      languages: {
        Row: {
          created_at: string
          id: string
          language: string
          proficiency: string | null
          sort_index: number
          tailoring_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          language: string
          proficiency?: string | null
          sort_index: number
          tailoring_id: string
        }
        Update: {
          created_at?: string
          id?: string
          language?: string
          proficiency?: string | null
          sort_index?: number
          tailoring_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "languages_tailoring_id_fkey"
            columns: ["tailoring_id"]
            isOneToOne: false
            referencedRelation: "tailoring_data"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          bullets: string[]
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          link: string | null
          name: string
          role: string | null
          sort_index: number
          start_date: string | null
          tailoring_id: string
        }
        Insert: {
          bullets?: string[]
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          link?: string | null
          name: string
          role?: string | null
          sort_index: number
          start_date?: string | null
          tailoring_id: string
        }
        Update: {
          bullets?: string[]
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          link?: string | null
          name?: string
          role?: string | null
          sort_index?: number
          start_date?: string | null
          tailoring_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_tailoring_id_fkey"
            columns: ["tailoring_id"]
            isOneToOne: false
            referencedRelation: "tailoring_data"
            referencedColumns: ["id"]
          },
        ]
      }
      publications: {
        Row: {
          co_authors: string[] | null
          created_at: string
          date_published: string | null
          id: string
          link: string | null
          sort_index: number
          tailoring_id: string
          title: string
          venue: string | null
        }
        Insert: {
          co_authors?: string[] | null
          created_at?: string
          date_published?: string | null
          id?: string
          link?: string | null
          sort_index: number
          tailoring_id: string
          title: string
          venue?: string | null
        }
        Update: {
          co_authors?: string[] | null
          created_at?: string
          date_published?: string | null
          id?: string
          link?: string | null
          sort_index?: number
          tailoring_id?: string
          title?: string
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "publications_tailoring_id_fkey"
            columns: ["tailoring_id"]
            isOneToOne: false
            referencedRelation: "tailoring_data"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_profiles: {
        Row: {
          about_me: string | null
          created_at: string
          email: string
          full_name: string
          github_url: string | null
          id: string
          job_title: string
          linkedin_url: string | null
          location: string | null
          phone: string | null
          tailoring_id: string
          website_url: string | null
        }
        Insert: {
          about_me?: string | null
          created_at?: string
          email: string
          full_name: string
          github_url?: string | null
          id?: string
          job_title: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          tailoring_id: string
          website_url?: string | null
        }
        Update: {
          about_me?: string | null
          created_at?: string
          email?: string
          full_name?: string
          github_url?: string | null
          id?: string
          job_title?: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          tailoring_id?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_profiles_tailoring_id_fkey"
            columns: ["tailoring_id"]
            isOneToOne: false
            referencedRelation: "tailoring_data"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_sections: {
        Row: {
          content: string
          created_at: string
          embedding: string | null
          id: string
          sort_index: number
          tailored_content: string | null
          tailoring_id: string | null
          type: string
        }
        Insert: {
          content: string
          created_at?: string
          embedding?: string | null
          id?: string
          sort_index: number
          tailored_content?: string | null
          tailoring_id?: string | null
          type: string
        }
        Update: {
          content?: string
          created_at?: string
          embedding?: string | null
          id?: string
          sort_index?: number
          tailored_content?: string | null
          tailoring_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "resume_sections_tailoring_id_fkey"
            columns: ["tailoring_id"]
            isOneToOne: false
            referencedRelation: "tailoring_data"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          created_at: string
          id: string
          proficiency: string | null
          skill_name: string
          sort_index: number
          tailoring_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          proficiency?: string | null
          skill_name: string
          sort_index: number
          tailoring_id: string
        }
        Update: {
          created_at?: string
          id?: string
          proficiency?: string | null
          skill_name?: string
          sort_index?: number
          tailoring_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_tailoring_id_fkey"
            columns: ["tailoring_id"]
            isOneToOne: false
            referencedRelation: "tailoring_data"
            referencedColumns: ["id"]
          },
        ]
      }
      tailoring_data: {
        Row: {
          created_at: string
          id: string
          job_description: string | null
          resume_path: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          job_description?: string | null
          resume_path: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          job_description?: string | null
          resume_path?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tailoring_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id?: string
          name?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      volunteer_experience: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          organization: string
          role: string | null
          sort_index: number
          start_date: string | null
          tailoring_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          organization: string
          role?: string | null
          sort_index: number
          start_date?: string | null
          tailoring_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          organization?: string
          role?: string | null
          sort_index?: number
          start_date?: string | null
          tailoring_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_experience_tailoring_id_fkey"
            columns: ["tailoring_id"]
            isOneToOne: false
            referencedRelation: "tailoring_data"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
