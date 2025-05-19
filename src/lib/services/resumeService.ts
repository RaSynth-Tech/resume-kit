import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { ParsedResume, ResumeSectionInsert, TailoringDataInsert } from '../parsers/types';
import { DB_TABLES, STORAGE_BUCKETS } from '@/config/database';
import { ResumeParserFactory } from '../parsers/factory';

export class ResumeService {
  private supabase: SupabaseClient<Database>;
  private parserFactory: ResumeParserFactory;

  constructor(supabase: SupabaseClient<Database>) {
    this.supabase = supabase;
    this.parserFactory = ResumeParserFactory.getInstance();
  }

  async processResume(
    file: File,
    jobDescription: string,
    userId: string,
    userEmail: string
  ): Promise<{ tailoringId: string; resumePath: string; publicUrl: string }> {
    try {
      // 1. Upload file to storage
      const { filePath, publicUrl } = await this.uploadResume(file, userEmail);

      // 2. Parse resume
      const parser = this.parserFactory.getParser('basic');
      const parsedResume = await parser.parse(file);
      console.log('Parsed resume sections:', parsedResume.sections.length);

      // 3. Save to database
      const tailoringId = await this.saveToDatabase(parsedResume, filePath, jobDescription, userId);

      return { tailoringId, resumePath: filePath, publicUrl };
    } catch (error) {
      console.error('Error processing resume:', error);
      throw error;
    }
  }

  private async uploadResume(
    file: File,
    userEmail: string
  ): Promise<{ filePath: string; publicUrl: string }> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${userEmail}/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await this.supabase.storage
      .from(STORAGE_BUCKETS.RESUMES)
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new Error(`Failed to upload resume: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = this.supabase.storage
      .from(STORAGE_BUCKETS.RESUMES)
      .getPublicUrl(filePath);

    return { filePath, publicUrl };
  }

  private async saveToDatabase(
    parsedResume: ParsedResume,
    filePath: string,
    jobDescription: string,
    userId: string
  ): Promise<string> {
    // 1. Save tailoring data
    const tailoringData: TailoringDataInsert = {
      id: crypto.randomUUID(),
      user_id: userId,
      job_description: jobDescription,
      resume_path: filePath,
      created_at: new Date().toISOString()
    };

    const { error: tailoringError } = await this.supabase
      .from(DB_TABLES.TAILORING_DATA)
      .insert([tailoringData]);

    if (tailoringError) {
      throw new Error(`Failed to save tailoring data: ${tailoringError.message}`);
    }

    // 2. Save resume sections
    const sectionInserts: ResumeSectionInsert[] = parsedResume.sections.map(section => ({
      id: crypto.randomUUID(),
      tailoring_id: tailoringData.id!,
      type: section.type,
      content: section.content,
      sort_index: section.sort_index,
      created_at: new Date().toISOString()
    }));

    const { error: sectionsError } = await this.supabase
      .from(DB_TABLES.RESUME_SECTIONS)
      .insert(sectionInserts);

    if (sectionsError) {
      // If sections insert fails, delete the tailoring data
      await this.supabase
        .from(DB_TABLES.TAILORING_DATA)
        .delete()
        .eq('id', tailoringData.id!);

      throw new Error(`Failed to save resume sections: ${sectionsError.message}`);
    }
    try {
      await this.supabase.rpc('send_to_resume_queue', {
        queue_name: 'resume-processing',
        message: { tailoringId: tailoringData.id }
      });
    } catch (rpcError) {
      console.error('Failed to send message to queue:', rpcError);
      // Optionally, you can add additional error handling logic here
      // For example, you might want to retry the operation or alert an administrator
    }
    return tailoringData.id!;
  }
} 