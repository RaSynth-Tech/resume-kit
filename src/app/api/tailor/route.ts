import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { TailoringRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const jobDescription = formData.get('jobDescription') as string;
    const resumeFile = formData.get('resumeFile') as File;

    // Validate inputs
    if (!email || !jobDescription || !resumeFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resumeFile.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF and DOCX files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (resumeFile.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Generate unique file name
    const fileExt = resumeFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${email}/${fileName}`;

    // Convert File to ArrayBuffer for Supabase upload
    const arrayBuffer = await resumeFile.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filePath, fileBuffer, {
        contentType: resumeFile.type,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload resume' },
        { status: 500 }
      );
    }

    // Get public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(filePath);
    // Store in database
    const tailoringRequest: TailoringRequest = {
      id: crypto.randomUUID(),
      user_id: email,
      job_description: jobDescription,
      resume_path: filePath,
      created_at: new Date().toISOString()
    };

    const { error: dbError } = await supabase
      .from('tailoring_data')
      .insert([{
        id: crypto.randomUUID(),
        user_id: email,
        job_description: jobDescription,
        resume_path: filePath,
        created_at: new Date().toISOString()
      }]);

    if (dbError) {
      // If database insert fails, delete the uploaded file
      await supabase.storage
        .from('resumes')
        .remove([filePath]);

      console.error('Database insert error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save request' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        email,
        resumePath: filePath,
        publicUrl
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 