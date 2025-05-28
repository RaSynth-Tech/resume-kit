// app/api/resume/[tailoringId]/sections/route.ts
import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { Database } from '@/types/supabase';

export async function GET(
    request: Request,
    { params }: { params: { tailoringId: string } }
) {
    try {
        const supabase = getSupabaseServerClient();
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;
        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Fetch data from each table
        type TableName = 'affiliations'| 'skills' | 'awards' | 'certifications' | 'conferences' | 'education' | 'experiences' | 'interests' | 'languages' | 'projects' | 'publications' | 'resume_profiles';
        const tables: TableName[] = ['affiliations', 'skills', 'awards', 'certifications', 'conferences', 'education', 'experiences', 'interests', 'languages', 'projects', 'publications', 'resume_profiles'];
        const sections = [];

        for (const table of tables) {
            const { data, error } = await supabase
                .from(table)
                .select('*') // Add other fields as needed
                .eq('tailoring_id', params.tailoringId);

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
            if (data) {
                for (const item of data) {
                    sections.push({
                        section_title: table,
                        ...item
                    });
                }

            }
        }

        return NextResponse.json(sections);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to get sections'}, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { tailoringId: string } }
) {
    try {
        const supabase = getSupabaseServerClient();
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;
        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { type, content } = body;

        if (!type || !content) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Update the section in the database
        const { error: updateError } = await supabase
            .from('resume_profiles')
            .update(content)
            .eq('tailoring_id', params.tailoringId)
            .eq('id', content.id);

        if (updateError) {
            console.error('Update error:', updateError);
            return NextResponse.json(
                { success: false, error: 'Failed to update section' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('PATCH error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
