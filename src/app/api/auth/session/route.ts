import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { SessionInfo } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) throw error;

    if (!session) {
      return NextResponse.json({
        success: true,
        data: {
          user: null,
          isAuthenticated: false,
        } as SessionInfo,
      });
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

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
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get session' },
      { status: 500 }
    );
  }
} 