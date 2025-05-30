// app/api/resume/[tailoringId]/sections/route.ts
import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { Database } from '@/types/supabase';

type TableName = keyof Database['public']['Tables'];

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

        const resumeData = await request.json();
        if (!resumeData) {
            return NextResponse.json(
                { success: false, error: 'Missing resume data' },
                { status: 400 }
            );
        }

        // Update each section in the database
        for (const [type, items] of Object.entries(resumeData)) {
            // Handle both single items and arrays
            const itemsToUpdate = Array.isArray(items) ? items : [items];
            
            for (const item of itemsToUpdate) {
                if (!item.id) continue;

                // Remove section_title and create a clean item for update
                const { section_title, ...cleanItem } = item;
                const tableName = section_title as TableName;

                if (!tableName) continue;

                const { error: updateError } = await supabase
                    .from(tableName)
                    .update(cleanItem)
                    .eq('tailoring_id', params.tailoringId)
                    .eq('id', item.id);

                if (updateError) {
                    console.error(`Update error for ${type}:`, updateError);
                    return NextResponse.json(
                        { success: false, error: `Failed to update ${type}` },
                        { status: 500 }
                    );
                }
            }
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
