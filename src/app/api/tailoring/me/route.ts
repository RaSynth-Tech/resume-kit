import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { TailoringHistoryResponse } from '@/types';
import { DB_TABLES } from '@/config/database';
import { Database } from '@/types/supabase';

type TailoringDataRow = Database['public']['Tables']['tailoring_data']['Row'];

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Validate pagination parameters
    if (isNaN(limit) || limit < 1 || limit > 50) {
      return NextResponse.json(
        { success: false, error: 'Invalid limit parameter' },
        { status: 400 }
      );
    }
    if (isNaN(offset) || offset < 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid offset parameter' },
        { status: 400 }
      );
    }

    let query = supabase
      .from(DB_TABLES.TAILORING_DATA)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);

    // If user is authenticated, get their requests
    // Otherwise, get anonymous requests by email
    if (session) {
      query = query.eq('user_id', session.user.id);
    } else {
      const email = searchParams.get('email');
      if (!email) {
        return NextResponse.json(
          { success: false, error: 'Email is required for anonymous requests' },
          { status: 400 }
        );
      }
      query = query.eq('email', email).is('user_id', null);
    }

    const { data: requests, error } = await query;

    if (error) throw error;

    const response: TailoringHistoryResponse = {
      success: true,
      data: requests as TailoringDataRow[],
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Get tailoring history error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get tailoring history' },
      { status: 500 }
    );
  }
} 