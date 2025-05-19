// app/api/resume/[tailoringId]/sections/route.ts
import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

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
        const { data: sections, error } = await supabase
            .from('resume_sections')
            .select('id, type, content, sort_index')
            .eq('tailoring_id', params.tailoringId)
            .order('sort_index', { ascending: true });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ sections });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to get sections'}, { status: 500 });
    }
}
