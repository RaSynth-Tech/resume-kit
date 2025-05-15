import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { UserProfile } from '@/types';

export async function GET(request: NextRequest) {
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

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileError) throw profileError;

    const response: UserProfile = {
      id: session.user.id,
      email: session.user.email!,
      name: profile?.name ?? undefined,
      avatar_url: profile?.avatar_url ?? undefined,
      created_at: session.user.created_at,
    };

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
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

    const { name, avatar_url } = await request.json();

    // Validate name if provided
    if (name && typeof name === 'string' && name.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Name must be less than 100 characters' },
        { status: 400 }
      );
    }

    // Validate avatar_url if provided
    if (avatar_url && typeof avatar_url === 'string') {
      try {
        new URL(avatar_url);
      } catch {
        return NextResponse.json(
          { success: false, error: 'Invalid avatar URL' },
          { status: 400 }
        );
      }
    }

    const { data: profile, error: updateError } = await supabase
      .from('users')
      .update({ name, avatar_url })
      .eq('id', session.user.id)
      .select()
      .single();

    if (updateError) throw updateError;

    const response: UserProfile = {
      id: session.user.id,
      email: session.user.email!,
      name: profile.name ?? undefined,
      avatar_url: profile.avatar_url ?? undefined,
      created_at: session.user.created_at,
    };

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 