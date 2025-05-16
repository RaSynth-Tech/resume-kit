import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { SessionInfo } from '@/types';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {

    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();

    const supabase = getSupabaseServerClient();

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Supabase session error:', error);
      throw new Error('Failed to fetch session');
    }

    if (!session) {
      return NextResponse.json({
        success: true,
        data: {
          user: null,
          isAuthenticated: false,
        } as SessionInfo,
      });
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileError) {
      console.warn('User profile not found:', profileError);
    }

    const response: SessionInfo = {
      user: {
        id: session.user.id,
        email: session.user.email!,
        name: profile?.name ?? undefined,
        avatar_url: profile?.avatar_url ?? undefined,
        created_at: session.user.created_at,
      },
      isAuthenticated: true,
    };

    return NextResponse.json({ success: true, data: response });
  } catch (err) {
    console.error('Session fetch error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to get session' },
      { status: 500 }
    );
  }
}
