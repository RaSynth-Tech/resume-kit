import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { SessionInfo } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();

    // Securely fetch the user using Supabase Auth server validation
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('Supabase user fetch error:', userError);
      throw new Error('Failed to fetch user');
    }

    if (!user) {
      return NextResponse.json({
        success: true,
        data: {
          user: null,
          isAuthenticated: false,
        } as SessionInfo,
      });
    }

    // Fetch user profile from 'users' table
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.warn('User profile not found:', profileError);
    }

    const response: SessionInfo = {
      user: {
        id: user.id,
        email: user.email!,
        name: profile?.name ?? undefined,
        avatar_url: profile?.avatar_url ?? undefined,
        created_at: user.created_at,
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
